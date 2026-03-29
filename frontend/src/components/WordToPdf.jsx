import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, FileText, Loader2, Download, RefreshCw, XCircle, CheckCircle } from 'lucide-react';

const WordToPdf = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [resultUrl, setResultUrl] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const selected = acceptedFiles[0];
            if (selected.name.endsWith('.docx')) {
                setFile(selected);
                setError('');
                setResultUrl(null);
            } else {
                setError('INVALID PROTOCOL: Please deploy only .docx archives.');
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
        maxFiles: 1
    });

    const handleConvert = async () => {
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setError('');
        
        // Setup progression sim
        const sim = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 15;
            });
        }, 300);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://quickpdf-0zwz.onrender.com/api/convert', formData, {
                responseType: 'blob',
            });
            
            clearInterval(sim);
            setProgress(100);

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setResultUrl(url);
        } catch (err) {
            clearInterval(sim);
            setError('CONVERSION FAILED: Core breach detected during synthesis.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const link = document.createElement('a');
        link.href = resultUrl;
        link.setAttribute('download', file.name.replace('.docx', '.pdf'));
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    const handleReset = () => {
        setFile(null);
        setResultUrl(null);
        setError('');
        setProgress(0);
    };

    return (
        <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
            {/* HUD Title */}
            <div className="text-center mb-12 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                    <span className="text-primary font-headline text-[10px] tracking-[0.3em] uppercase">Conversion Protocol Alpha</span>
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                </div>
                <h1 className="text-5xl font-headline font-bold text-on-surface tracking-tight mb-4 uppercase">Word to PDF</h1>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
                    High-precision document synthesis. Deploy your .docx assets for immediate PDF stabilization.
                </p>
            </div>

            {/* Error HUD */}
            {error && (
                <div className="w-full max-w-4xl mb-6 bg-error-container/20 border border-error/50 p-4 rounded-sm flex items-center justify-between kinetic-glow">
                    <div className="flex gap-4 items-center">
                        <XCircle className="text-error" size={24} />
                        <span className="text-error text-xs font-bold uppercase tracking-widest">{error}</span>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 h-[500px]">
                {/* Upload Area */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                    {!file ? (
                        <div {...getRootProps()} className={`group relative surface-container border-2 border-dashed ${isDragActive ? 'border-primary' : 'border-outline-variant/30'} hover:border-primary/50 p-12 rounded-lg transition-all duration-300 flex flex-col items-center justify-center text-center kinetic-glow bg-surface-container/40 backdrop-blur-sm cursor-pointer h-full min-h-[400px]`}>
                            <input {...getInputProps()} />
                            
                            {/* HUD Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40"></div>
                            
                            <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 border border-outline-variant/20 group-hover:scale-110 transition-transform">
                                <UploadCloud className="text-primary w-10 h-10" />
                            </div>
                            
                            <h3 className="font-headline text-xl text-on-surface mb-2 tracking-wide uppercase">Deploy Source Document</h3>
                            <p className="text-on-surface-variant text-xs mb-8 tracking-widest uppercase opacity-60">
                                Drag & Drop .docx or <span className="text-primary cursor-pointer hover:underline">Browse Files</span>
                            </p>

                            <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                <div className="px-3 py-1 border border-outline-variant rounded text-[10px] text-on-surface-variant tracking-widest uppercase">MAX 50MB</div>
                                <div className="px-3 py-1 border border-outline-variant rounded text-[10px] text-on-surface-variant tracking-widest uppercase">AES-256 ENCRYPTED</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full bg-surface-container/20 p-6 border border-primary/20 rounded-lg justify-center relative overflow-hidden backdrop-blur-sm">
                             {/* Process Area */}
                            <div className="relative z-10 flex flex-col grow justify-center">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-surface-container-lowest p-3 rounded-md">
                                            <FileText className="text-primary w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold text-on-surface tracking-wide">{file.name}</h4>
                                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
                                                Size: {(file.size / 1024 / 1024).toFixed(2)} MB • Protocol: Word-to-PDF
                                            </p>
                                        </div>
                                    </div>
                                    {!loading && !resultUrl && (
                                        <button onClick={handleReset} className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline px-2 py-1 flex items-center gap-1">
                                            <RefreshCw size={14} /> Replace
                                        </button>
                                    )}
                                </div>

                                {/* Progress Bar (The "Scan-line") */}
                                {loading && (
                                    <div className="mt-4 animate-in fade-in duration-300">
                                        <div className="relative h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden mb-3">
                                            <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(126,236,255,0.8)] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}>
                                                <div className="scan-line animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-tighter">
                                            <span className="text-primary font-bold">SYNTHESIZING: {Math.floor(progress)}%</span>
                                            <span className="text-on-surface-variant">ESTIMATED: &lt; 2.0s</span>
                                        </div>
                                    </div>
                                )}

                                {resultUrl && (
                                    <div className="mt-4 p-4 border border-outline-variant/30 bg-surface-container rounded-sm flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
                                        <CheckCircle className="text-primary" size={20} />
                                        <span className="text-xs uppercase tracking-widest text-primary font-bold">Extraction Successful. Payload secured.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    {/* Action Card */}
                    <div className="surface-container p-6 rounded-lg border border-outline-variant/10 flex flex-col gap-6 h-full bg-surface-container/60 backdrop-blur-sm">
                        <div className="space-y-4">
                            <div className="p-4 bg-surface-container-lowest rounded border-l-4 border-primary">
                                <h5 className="text-[10px] font-headline text-primary uppercase tracking-widest mb-1">Status Report</h5>
                                <p className="text-xs text-on-surface-variant leading-relaxed italic">
                                    {resultUrl 
                                        ? `"Synthesis complete. Archive ready for extraction."`
                                        : file ? `"Document buffers initialized. Formatting metadata parsed successfully."` 
                                        : `"Awaiting core input module injection."`}
                                </p>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-outline-variant/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Quality Mode</span>
                                    <span className="text-[10px] text-primary uppercase font-bold">Ultra-HD</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Engine</span>
                                    <span className="text-[10px] text-on-surface-variant uppercase">Ghostscript</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-outline-variant/10">
                            {!resultUrl ? (
                                <button
                                    onClick={handleConvert}
                                    disabled={!file || loading}
                                    className={`w-full font-headline font-bold uppercase tracking-[0.2em] py-4 rounded-sm flex items-center justify-center gap-3 transition-all ${!file || loading ? 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-container text-on-primary active:scale-95 kinetic-glow hover:brightness-110'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin text-primary" size={20} /> : <RefreshCw size={20} />}
                                    {loading ? 'Converting...' : 'Convert Stream'}
                                </button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleDownload}
                                        className="w-full bg-primary/20 border border-primary text-primary font-headline font-bold uppercase tracking-[0.2em] py-4 rounded-sm flex items-center justify-center gap-3 active:scale-95 transition-all kinetic-glow hover:bg-primary hover:text-on-primary"
                                    >
                                        <Download size={20} />
                                        Extract PDF
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="w-full border border-outline-variant/30 text-on-surface-variant font-headline font-bold uppercase tracking-[0.2em] py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors text-xs"
                                    >
                                        New Sequence
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordToPdf;
