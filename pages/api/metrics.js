import {register} from "../../src/utils/metrics";

export default (_req, res) => {
    res.send(register.metrics())
}