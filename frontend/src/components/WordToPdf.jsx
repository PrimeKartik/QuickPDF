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
            if (selected.name.endsWith('.docx') || selected.name.endsWith('.doc')) {
                setFile(selected);
                setError('');
                setResultUrl(null);
            } else {
                setError('Invalid file format. Please upload a Word document (.doc or .docx).');
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'application/msword': ['.doc'] },
        maxFiles: 1
    });

    const handleConvert = async () => {
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setError('');
        
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

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setResultUrl(url);
        } catch (err) {
            clearInterval(sim);
            setError('Conversion Failed. Try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const link = document.createElement('a');
        link.href = resultUrl;
        link.setAttribute('download', file.name.replace(/\.docx?$/, '.pdf'));
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
        <div className="w-full flex flex-col items-center">

            {error && (
                <div className="w-full mb-6 bg-[#fff0f0] border-l-4 border-[#ff4d4f] p-4 rounded-sm flex items-center gap-3">
                    <XCircle color="#ff4d4f" size={24} />
                    <span className="text-sm font-medium text-text-secondary">{error}</span>
                </div>
            )}

            <div className="w-full max-w-5xl gradient-border-wrapper p-3">
                <div 
                    {...(file ? {} : getRootProps())} 
                    className={`w-full bg-white rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[450px] transition-all duration-fast ${file ? 'border-[#e5e7eb] p-10 cursor-default' : isDragActive ? 'border-surface-raised bg-[#f0f6ff]' : 'border-[#d1d5db] hover:border-[#a1a1aa] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2'}`}
                    tabIndex={file ? -1 : 0}
                    role={file ? "region" : "button"}
                    aria-label="Upload Word Document"
                >
                    {!file && <input {...getInputProps()} />}

                    {!file ? (
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                            {/* Replicated Stacking Icon */}
                            <div className="relative w-24 h-24 mb-6">
                                <div className="absolute top-0 left-0 w-16 h-16 bg-[#8ba7ff] rounded-xl shadow-sm rotate-[-10deg]"></div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#4c8bf5] rounded-xl shadow-md flex items-center justify-center">
                                    <span className="text-white font-bold text-3xl font-headline">W</span>
                                </div>
                            </div>

                            <button className="px-8 py-3 bg-surface-raised text-text-inverse text-lg font-bold rounded-lg shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:brightness-110 hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] transition-all duration-fast flex items-center justify-center gap-2 min-h-[44px] pointer-events-auto active:scale-95">
                                <UploadCloud size={22} strokeWidth={2.5} />
                                Upload Word Files to Convert
                            </button>

                            <p className="text-sm text-text-secondary mt-6 font-medium">
                                Or drop Word files here to convert to PDF format
                            </p>
                        </div>
                    ) : (
                        <div className="w-full max-w-2xl flex flex-col items-center">
                            <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 p-6 bg-[#fafafa] border border-[#f0f0f0] rounded-lg">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="bg-[#f0f6ff] p-4 rounded-lg">
                                        <FileText className="text-surface-raised w-8 h-8" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-md font-bold text-text-tertiary truncate max-w-[200px] md:max-w-[300px]">{file.name}</h4>
                                        <p className="text-sm text-text-secondary mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                
                                {!loading && !resultUrl && (
                                    <button 
                                        onClick={handleReset} 
                                        className="text-sm font-medium text-text-secondary hover:text-text-tertiary underline underline-offset-2 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 p-2 rounded"
                                    >
                                        <RefreshCw size={16} /> Choose different file
                                    </button>
                                )}
                            </div>

                            {loading && (
                                <div className="mt-4 mb-8 w-full max-w-lg">
                                    <div className="flex justify-between items-center text-sm mb-2 text-text-secondary font-medium">
                                        <span>Converting...</span>
                                        <span>{Math.floor(progress)}%</span>
                                    </div>
                                    <div className="relative h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                                        <div 
                                            className="absolute top-0 left-0 h-full bg-surface-raised transition-all duration-fast ease-out" 
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {resultUrl && (
                                <div className="mt-4 mb-8 p-4 w-full max-w-lg bg-[#f6ffed] border border-[#b7eb8f] rounded-lg flex items-center gap-3">
                                    <CheckCircle className="text-[#52c41a]" size={24} />
                                    <span className="text-md text-[#52c41a] font-medium">Conversion successful.</span>
                                </div>
                            )}

                            <div className="mt-auto flex flex-col sm:flex-row gap-4 justify-center w-full">
                                {!resultUrl ? (
                                    <button
                                        onClick={handleConvert}
                                        disabled={loading}
                                        className={`text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-all duration-fast min-h-[44px] min-w-[250px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 ${loading ? 'bg-[#f5f5f5] text-[#b8b8b8] cursor-not-allowed' : 'bg-surface-raised text-text-inverse hover:brightness-110 shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                                        {loading ? 'Converting' : 'Convert to PDF'}
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-surface-raised text-text-inverse text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-fast shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:brightness-110 hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] active:scale-95 min-h-[44px] min-w-[250px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2"
                                        >
                                            <Download size={20} />
                                            Download PDF
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="bg-[#ffffff] border-2 border-[#e5e7eb] text-text-secondary hover:text-text-tertiary hover:border-surface-raised text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-fast min-h-[44px] min-w-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 active:scale-95"
                                        >
                                            Convert another
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WordToPdf;
