import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Layers, FilePlus, Loader2, Download, RefreshCw, XCircle, CheckCircle, GripVertical, Trash2 } from 'lucide-react';

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
            setError('INVALID TYPE: Only .pdf files are accepted for merging.');
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
            setError('Protocol requires at least two PDF units to merge.');
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
            setError('FUSION FAILED: Core breach detected during merge synthesis.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!resultUrl) return;
        const link = document.createElement('a');
        link.href = resultUrl;
        link.setAttribute('download', 'Merged_Protocol.pdf');
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
        <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
            {/* HUD Title */}
            <div className="text-center mb-12 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                    <span className="text-primary font-headline text-[10px] tracking-[0.3em] uppercase">Fusion Protocol Beta</span>
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                </div>
                <h1 className="text-5xl font-headline font-bold text-on-surface tracking-tight mb-4 uppercase">Merge PDFs</h1>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
                    Combine multiple intel assets into a single secure protocol. Drop files to initiate alignment.
                </p>
            </div>

            {error && (
                <div className="w-full max-w-4xl mb-6 bg-error-container/20 border border-error/50 p-4 rounded-sm flex items-center justify-between kinetic-glow">
                    <div className="flex gap-4 items-center">
                        <XCircle className="text-error" size={24} />
                        <span className="text-error text-xs font-bold uppercase tracking-widest">{error}</span>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 min-h-[500px]">
                {/* Upload & List Area */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div {...getRootProps()} className={`group relative surface-container border-2 border-dashed ${isDragActive ? 'border-primary' : 'border-outline-variant/30'} hover:border-primary/50 p-6 rounded-lg transition-all duration-300 flex flex-col items-center justify-center text-center kinetic-glow bg-surface-container/40 backdrop-blur-sm cursor-pointer`}>
                        <input {...getInputProps()} />
                        <div className="flex items-center gap-4">
                            <FilePlus className="text-primary opacity-60 w-8 h-8" />
                            <p className="font-headline text-on-surface tracking-widest uppercase">
                                + ADD PAYLOAD MODULES
                            </p>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {files.map((file, idx) => (
                                <div key={idx} className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/20 flex items-center justify-between hover:border-primary/30 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <GripVertical className="text-on-surface-variant/30 cursor-grab" size={20} />
                                        <span className="text-primary font-mono text-[10px] bg-primary/10 px-2 py-1 rounded">0{idx + 1}</span>
                                        <div>
                                            <p className="font-headline text-sm font-bold text-on-surface">{file.name}</p>
                                            <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest">
                                                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="text-error/50 hover:text-error opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {resultUrl && (
                        <div className="mt-4 p-4 border border-outline-variant/30 bg-surface-container rounded-sm flex items-center justify-center gap-3 animate-in slide-in-from-top-4 duration-500">
                            <CheckCircle className="text-primary" size={20} />
                            <span className="text-xs uppercase tracking-widest text-primary font-bold">Fusion Sequence Completed. Payload Ready.</span>
                        </div>
                    )}
                </div>

                {/* Controls Area */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="surface-container p-6 rounded-lg border border-outline-variant/10 flex flex-col gap-6 h-full bg-surface-container/60 backdrop-blur-sm">
                        <div className="space-y-4">
                            <div className="p-4 bg-surface-container-lowest rounded border-l-4 border-primary">
                                <h5 className="text-[10px] font-headline text-primary uppercase tracking-widest mb-1">Status Report</h5>
                                <p className="text-xs text-on-surface-variant leading-relaxed italic">
                                    {resultUrl 
                                        ? `"Assets encrypted and unified successfully."`
                                        : files.length > 1 ? `"${files.length} modules locked. Awaiting fusion command."` 
                                        : files.length === 1 ? `"1 module detected. Minimum 2 required for fusion."`
                                        : `"Scanner active. Awaiting PDF payloads."`}
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-outline-variant/10">
                            {!resultUrl ? (
                                <button
                                    onClick={handleMerge}
                                    disabled={files.length < 2 || loading}
                                    className={`w-full font-headline font-bold uppercase tracking-[0.2em] py-4 rounded-sm flex items-center justify-center gap-3 transition-all ${files.length < 2 || loading ? 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-container text-on-primary active:scale-95 kinetic-glow hover:brightness-110'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin text-primary" size={20} /> : <Layers size={20} />}
                                    {loading ? 'Synthesizing...' : 'Merge Sequence'}
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
                                        <RefreshCw size={14} /> Clear Cache
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

export default MergePdf;
