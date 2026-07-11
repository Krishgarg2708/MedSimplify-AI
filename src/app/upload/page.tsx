'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X, BrainCircuit, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { processMedicalReport } from '@/app/actions/process-report';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setTimeout(() => {
      setIsUploading(false);
      setIsProcessing(true);
      startAIProcessing();
    }, 1200);
  };

  const startAIProcessing = async () => {
    try {
      // Mocking text extraction since we don't have a real OCR server here
      // In a real app, you'd send the file to a server, get OCR text, then pass to processMedicalReport
      const mockReportText = `
        PATIENT REPORT: Sarah Connor
        DATE: 2024-05-15
        TEST: Complete Blood Count (CBC)
        FINDINGS:
        Hemoglobin: 11.2 g/dL (Normal: 12.0 - 15.5) - LOW
        WBC Count: 6.2 x 10^3/uL (Normal: 4.5 - 11.0) - NORMAL
        Platelets: 250 x 10^3/uL (Normal: 150 - 450) - NORMAL
        MCV: 78 fL (Normal: 80 - 100) - LOW
        Prescription: Ferrous Sulfate 325mg once daily for iron deficiency.
      `;

      const result = await processMedicalReport(mockReportText);
      
      // Store result in local storage for demo purposes
      localStorage.setItem('last_report', JSON.stringify(result));
      
      toast({
        title: "Processing Complete",
        description: "Your report has been simplified and analyzed.",
      });

      router.push('/reports/latest');
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Processing Failed",
        description: "There was an error analyzing your report.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold mb-4">Upload Medical Report</h1>
          <p className="text-muted-foreground">Support for PDF, JPG, PNG and JPEG up to 10MB.</p>
        </div>

        <Card className="border-dashed border-2 bg-card/50 overflow-hidden">
          <CardContent className="p-12">
            {!file ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop file here</h3>
                <p className="text-muted-foreground mb-8">or click to browse from your device</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="file-upload" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <File className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isUploading || isProcessing}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Uploading document...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {isProcessing && (
                  <div className="p-8 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-4">
                    <BrainCircuit className="w-12 h-12 text-primary mx-auto animate-pulse" />
                    <div>
                      <h4 className="font-bold text-lg">AI Analysis in Progress</h4>
                      <p className="text-sm text-muted-foreground">Gemini is translating medical jargon into human language...</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs font-medium text-primary">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> OCR Extracted</span>
                      <span className="flex items-center gap-1 animate-pulse"><CheckCircle2 className="w-4 h-4" /> Analyzing Terms</span>
                    </div>
                  </div>
                )}

                {!isUploading && !isProcessing && (
                  <Button className="w-full h-12 text-lg font-bold" onClick={handleUpload}>
                    Start Analysis
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            <strong>Disclaimer:</strong> MedSimplify AI provides interpretations for educational purposes only. This tool does not diagnose diseases or provide medical advice. Always consult with a licensed healthcare professional for clinical decisions.
          </p>
        </div>
      </main>
    </div>
  );
}
