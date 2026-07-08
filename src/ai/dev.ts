import { config } from 'dotenv';
config();

import '@/ai/flows/explain-medical-terms-flow.ts';
import '@/ai/flows/assess-health-risk-flow.ts';
import '@/ai/flows/explain-prescription-flow.ts';
import '@/ai/flows/simplify-medical-report-flow.ts';
import '@/ai/flows/detect-emergency-indicators-flow.ts';
import '@/ai/flows/generate-doctor-questions-flow.ts';