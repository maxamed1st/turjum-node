import { StrictAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  namespace Express {
    interface Request extends StrictAuthProp { }
    namespace Multer {
      interface File extends FileProp { location: String }
    }
  }
}
