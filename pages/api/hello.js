import {requestMetrics, metrics} from "../../src/utils/metrics";

export default function handler(req, res) {

  requestMetrics.labels('api_request', 'hello_api').inc()

  console.log(metrics)

  res.status(200).json({ name: 'John Doe' })
}
