import prometheus from 'prom-client';

const { Registry, collectDefaultMetrics } = prometheus;

const namespace = `test-application`;

export const register = new Registry();

register.setDefaultLabels({ namespace });

collectDefaultMetrics({ register, timeout: 5000 });

export const getMetricName = (metricName) =>
    metricName.toLowerCase().replace(/[^a-z0-9]/g, '_');

export const metrics = {};

export const registerMetric = ({name, type, labelNames, ...options}) => {
    const { [type]: Metric } = prometheus;

    if (!Metric) {
        throw new Error(`Unexpected metric type "${type}"`);
    }

    const metricName = getMetricName(name);

    const metricOptions = {
        ...options,
        name: metricName,
        registers: [register],
        labelNames,
    };

    if (metrics[name]) {
        throw new Error(`Custom metric "${name}" (${metricName}) already created.`);
    }

    const customMetric = new Metric(metricOptions);

    metrics[name] = customMetric;

    return customMetric;
};

export const requestMetrics = registerMetric({
    name: 'requests_metrics',
    help: 'metrics for requests',
    type: 'Counter',
    labelNames: ['name', 'event'],
});

export default metrics;