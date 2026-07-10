'use server';

import { simplifyMedicalReport, type SimplifyMedicalReportOutput } from '@/ai/flows/simplify-medical-report-flow';
import { detectEmergencyIndicators } from '@/ai/flows/detect-emergency-indicators-flow';
import { generateDoctorQuestions } from '@/ai/flows/generate-doctor-questions-flow';

export async function processMedicalReport(reportText: string): Promise<{
  report: SimplifyMedicalReportOutput;
  emergency: boolean;
  doctorQuestions: string[];
}> {
  try {
    // Parallel processing for efficiency
    const [reportResult, emergencyResult] = await Promise.all([
      simplifyMedicalReport({ reportText }),
      detectEmergencyIndicators({ reportText }),
    ]);

    const questionsResult = await generateDoctorQuestions({
      simplifiedReportSummary: reportResult.summary,
      importantFindings: reportResult.importantFindings,
      abnormalValues: reportResult.abnormalValues,
      possibleConcerns: reportResult.riskReason,
    });

    return {
      report: reportResult,
      emergency: emergencyResult.emergencyWarning,
      doctorQuestions: questionsResult,
    };
  } catch (error) {
    console.error('Processing error:', error);
    throw new Error('Failed to process medical report. Please try again.');
  }
}