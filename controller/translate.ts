import { TranslationServiceClient } from "@google-cloud/translate";
// import { storage } from "../utils/firebase";
import { log } from "console";
import { Request, Response, } from "express";
import { writeFileSync } from "fs";
import { documentTranslationResponse } from "../file";

type translationProps = {
  projectId: any,
  location: any,
  inputUri: any,
  sourceLang?: any,
  targetLang?: any,
  outputUriPrefix?: any
}

function translate(
  { projectId,
    location,
    inputUri,
    sourceLang = "en",
    targetLang = "so",
    outputUriPrefix = "gs://turjum-cf6e9.appspot.com/users/untitled.txt"
  }: translationProps
) {
  // Instantiates a client
  const translationClient = new TranslationServiceClient();

  const documentInputConfig = {
    gcsSource: {
      inputUri,
    },
  }

  const docuementOutputConfig = {
    gcsDestination: {
      outputUriPrefix
    }
  }

  async function translateDocument() {
    // Construct request
    const request = {
      parent: translationClient.locationPath(projectId, location),
      documentInputConfig: documentInputConfig,
      docuementOutputConfig: docuementOutputConfig,
      sourceLanguageCode: sourceLang,
      targetLanguageCode: targetLang,
    };

    // Run request
    const [response] = await translationClient.translateDocument(request);

    return response;
  }

  const response = translateDocument();
  return response;
}

export default async function handler(req: Request, res: Response) {
  try {
    const projectId = process.env.projectId;
    const location = process.env.GOOGLE_LOCATION;
    const { sourceLang, targetLang, uri, outputUriPrefix } = req.query;
    log("query", req.query);

    const response = await translate({
      projectId,
      location,
      inputUri: uri,
      sourceLang,
      targetLang,
      outputUriPrefix
    });

    const buffer = response.documentTranslation.byteStreamOutputs[0].buffer;
    writeFileSync("so.pdf", new Uint8Array(buffer));
    // const result = await storage.bucket().upload("so.pdf");

    log("handler docTRes", documentTranslationResponse);
    log("handler result", response)
    res.json(response)
  }

  catch (err) {
    log(err);
    res.status(500);
    res.json("internal server error");
  }

  finally {
    res.end();
  }
}
