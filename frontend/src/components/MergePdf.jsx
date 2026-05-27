import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Layers, FilePlus, Loader2, Download, RefreshCw, XCircle, CheckCircle, GripVertical, Trash2, FileText, UploadCloud } from 'lucide-react';

const MergePdf = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultUrl, setResultUrl] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const validPdfs = acceptedFiles.filter(f => f.name.endsWith('.pdf'));
        if (validPdfs.length > 0) {
            setFiles(prev => [...prev, ...validPdfs]);
            setError('');
            setResultUrl(null);
        } else {
            setError('Invalid file format. Only .pdf files are accepted for merging.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    });

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Please upload at least two PDF files to merge.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        try {
            const response = await axios.post('https://quickpdf-0zwz.onrender.com/api/merge', formData, {
                responseType: 'blob',
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setResultUrl(url);
        } catch (err) {
            setError('Merge Failed. Try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const link = document.createElement('a');
        link.href = resultUrl;
        link.setAttribute('download', 'Merged_Document.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    const handleReset = () => {
        setFiles([]);
        setResultUrl(null);
        setError('');
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
                    {...(files.length === 0 ? getRootProps() : {})} 
                    className={`w-full bg-white rounded-xl border-2 border-dashed flex flex-col items-center min-h-[450px] transition-all duration-fast ${files.length > 0 ? 'border-[#e5e7eb] p-10 cursor-default' : isDragActive ? 'border-surface-raised bg-[#f0f6ff] justify-center' : 'border-[#d1d5db] hover:border-[#a1a1aa] cursor-pointer justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2'}`}
                    tabIndex={files.length > 0 ? -1 : 0}
                    role={files.length > 0 ? "region" : "button"}
                    aria-label="Upload PDF Documents"
                >
                    {files.length === 0 && <input {...getInputProps()} />}

                    {files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                            {/* Stacked PDF Icon */}
                            <div className="relative w-24 h-24 mb-6">
                                <div className="absolute top-0 left-0 w-16 h-16 bg-[#ff8b8b] rounded-xl shadow-sm rotate-[-10deg]"></div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#f54c4c] rounded-xl shadow-md flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl font-headline">PDF</span>
                                </div>
                            </div>

                            <button className="px-8 py-3 bg-surface-raised text-text-inverse text-lg font-bold rounded-lg shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:brightness-110 hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] transition-all duration-fast flex items-center justify-center gap-2 min-h-[44px] pointer-events-auto active:scale-95">
                                <UploadCloud size={22} strokeWidth={2.5} />
                                Upload PDF Files to Merge
                            </button>

                            <p className="text-sm text-text-secondary mt-6 font-medium">
                                Or drop PDF files here to combine them
                            </p>
                        </div>
                    ) : (
                        <div className="w-full max-w-3xl flex flex-col items-center">
                            
                            <div className="w-full flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-text-tertiary">Files to Merge</h3>
                                {!resultUrl && (
                                    <div {...getRootProps()} className="cursor-pointer">
                                        <input {...getInputProps()} />
                                        <button className="text-sm font-medium text-surface-raised hover:text-[#0047cc] flex items-center gap-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 rounded">
                                            <FilePlus size={18} /> Add more files
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-3 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {files.map((file, idx) => (
                                    <div key={idx} className="bg-[#fafafa] p-4 rounded-lg border border-[#f0f0f0] flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <GripVertical className="text-[#d9d9d9] cursor-grab" size={20} />
                                            <div className="bg-[#fff0f0] p-2 rounded-md">
                                                <FileText className="text-[#f54c4c] w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-tertiary text-sm truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                                                <p className="text-xs text-text-secondary mt-0.5">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        {!resultUrl && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); removeFile(idx); }} 
                                                className="text-[#ff4d4f] opacity-50 hover:opacity-100 transition-opacity p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 rounded"
                                                aria-label="Remove file"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {loading && (
                                <div className="mt-4 mb-8 w-full">
                                    <div className="flex justify-between items-center text-sm mb-2 text-text-secondary font-medium">
                                        <span>Merging PDFs...</span>
                                    </div>
                                    <div className="relative h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full w-full bg-surface-raised animate-pulse"></div>
                                    </div>
                                </div>
                            )}

                            {resultUrl && (
                                <div className="mt-4 mb-8 p-4 w-full bg-[#f6ffed] border border-[#b7eb8f] rounded-lg flex items-center gap-3">
                                    <CheckCircle className="text-[#52c41a]" size={24} />
                                    <span className="text-md text-[#52c41a] font-medium">PDFs merged successfully.</span>
                                </div>
                            )}

                            <div className="mt-auto flex flex-col sm:flex-row gap-4 justify-center w-full pt-6 border-t border-[#f0f0f0]">
                                {!resultUrl ? (
                                    <button
                                        onClick={handleMerge}
                                        disabled={files.length < 2 || loading}
                                        className={`text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-all duration-fast min-h-[44px] min-w-[250px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 ${files.length < 2 || loading ? 'bg-[#f5f5f5] text-[#b8b8b8] cursor-not-allowed' : 'bg-surface-raised text-text-inverse hover:brightness-110 shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Layers size={20} />}
                                        {loading ? 'Merging...' : 'Merge PDFs'}
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-surface-raised text-text-inverse text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-fast shadow-[0_4px_14px_0_rgba(0,97,255,0.39)] hover:brightness-110 hover:shadow-[0_6px_20px_rgba(0,97,255,0.23)] hover:scale-[1.02] active:scale-95 min-h-[44px] min-w-[250px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2"
                                        >
                                            <Download size={20} />
                                            Download Merged PDF
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="bg-[#ffffff] border-2 border-[#e5e7eb] text-text-secondary hover:text-text-tertiary hover:border-surface-raised text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-fast min-h-[44px] min-w-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-raised focus-visible:ring-offset-2 active:scale-95"
                                        >
                                            Merge another
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

export default MergePdf;
