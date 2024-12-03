import cnf from "dotenv";
cnf.config();

const config = {
apiPayment: process.env.API_PORT || '3030',
apiPaymentKey: process.env.API_KEY,
apiName: process.env.API_NAME,
apiFlowKey: process.env.API_FLOW_KEY,
apiReveniuKey: process.env.API_REVENIU_KEY,
webhookFlow: process.env.FLOW_WEBHOOK_URL,
flow: process.env.API_FLOW_URL,
reveniu: process.env.API_REVENIU_URL,
};

export default config;