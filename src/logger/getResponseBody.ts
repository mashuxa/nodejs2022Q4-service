import { Response } from 'express';

// todo: to refactor
export const getResponseBody = (
  res: Response,
  callback: (body: string) => void,
) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];

  res.write = (...chunks) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };

  res.end = (...chunk) => {
    const resArgs = [];

    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }

    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');
    const responseLog = {
      response: {
        statusCode: res.statusCode,
        body,
        headers: res.getHeaders(),
      },
    };

    rawResponseEnd.apply(res, resArgs);

    callback(body);

    return responseLog as unknown as Response;
  };
};
