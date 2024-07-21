import { TranslationServiceClient } from "@google-cloud/translate";
// import { storage } from "../utils/firebase";
import { log } from "console";
import { Request, Response, } from "express";
import { writeFileSync } from "fs";
import { documentTranslationResponse } from "../file";

type translationProps = {
  inputUri: any,
  sourceLang?: any,
  targetLang?: any,
  outputUriPrefix?: any
}

function translate(
  { 
    inputUri,
    sourceLang = "en",
    targetLang = "so",
    outputUriPrefix = "gs://turjum-cf6e9.appspot.com/users/untitled.txt"
  }: translationProps
) {
  // Instantiates a client
  const translationClient = new TranslationServiceClient();
  const projectId = process.env.PROJECT_ID;
  const location = process.env.LOCATION;

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
    const { sourceLang, targetLang, inputUri, outputUriPrefix } = req.query;
    log("query", req.query);

    const response = await translate({
      inputUri,
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
