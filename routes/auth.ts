import { Request, Response } from 'express';
import {
  sessions,
  RequireAuthProp
} from '@clerk/clerk-sdk-node';
import Cookies from 'cookies';

export default async function authenticate(req: RequireAuthProp<Request>, res: Response) {
  // Retrieve the particular session ID from a
  // query string parameter
  const sessionId = req.query._clerk_session_id;

  // Note: Clerk stores the clientToken in a cookie 
  // named "__session" for Firebase compatibility
  const cookies = new Cookies(req, res);
  const clientToken = cookies.get('__session');

  const session = await sessions.verifySession(sessionId, clientToken);
}

