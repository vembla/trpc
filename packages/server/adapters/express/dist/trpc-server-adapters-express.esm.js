import { r as requestHandler } from '../../../dist/index-a273ce95.esm.js';
import 'url';
import '../../../dist/callProcedure-94240708.esm.js';
import '../../../dist/codes-02fc3a5f.esm.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
function createExpressMiddleware(opts) {
  return (req, res) => {
    const endpoint = req.path.substr(1);
    requestHandler({ ...opts,
      req,
      res,
      path: endpoint
    });
  };
}

export { createExpressMiddleware };
