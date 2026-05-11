"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useState, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import {
    Upload,
    FileText,
    Image as ImageIcon,
    CheckCircle,
    Loader2,
    ArrowLeft,
    AlertCircle,
    BookOpen
} from "lucide-react";
import { Link } from "@/i18n/routing";

export default function SubmitPodcastPage() {
    const t = useTranslations('SubmitPodcastPage');
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        content: "",
        showAuthorName: true
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: "Image must be less than 5MB" }));
                return;
            }
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, image: "" }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = t('validation.titleRequired');
        } else if (formData.title.length < 5) {
            newErrors.title = t('validation.titleTooShort');
        }

        if (!formData.url.trim()) {
            newErrors.url = t('validation.urlRequired');
        } else if (!/^https?:\/\/.+/.test(formData.url)) {
            newErrors.url = 'Please enter a valid URL';
        }

        if (!formData.content.trim()) {
            newErrors.content = t('validation.contentRequired');
        } else if (formData.content.length < 20) {
            newErrors.content = t('validation.contentTooShort');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !user) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('url', formData.url);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('type', 'podcast');
            formDataToSend.append('showAuthorName', String(formData.showAuthorName));
            formDataToSend.append('name', user.displayName || 'Anonymous');
            formDataToSend.append('email', user.email || '');
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            const response = await fetch('/api/submit-media', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit article');
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-red animate-spin" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-red/20 flex items-center justify-center mx-auto border border-red/30">
                        <AlertCircle className="w-10 h-10 text-red" />
                    </div>
                    <h2 className="font-bebas text-4xl text-foreground">{t('loginRequired')}</h2>
                    <p className="font-oswald text-foreground/60">{t('description')}</p>
                    <Link href="/login">
                        <button className="px-8 py-4 bg-red hover:bg-red/90 text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-red/30">
                            {t('loginButton')}
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Success state
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <CheckCircle className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="font-bebas text-5xl text-foreground">{t('success.title')}</h2>
                    <p className="font-oswald text-lg text-foreground/70 max-w-md mx-auto leading-relaxed">
                        {t('success.message')}
                    </p>
                    <Link href="/podcasts">
                        <button className="px-8 py-4 bg-blue hover:bg-blue/90 text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-blue/30">
                            {t('success.backButton')}
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">


                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 px-4 py-2 rounded-full mb-6">
                            <FileText className="w-4 h-4 text-blue" />
                            <span className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">
                                {t('subtitle')}
                            </span>
                        </div>
                        <AnimatedTitle
                            text={t('title')}
                            className="text-5xl md:text-7xl font-bebas text-foreground mb-4"
                        />
                        <p className="font-oswald text-lg text-foreground/70 max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    {/* Main Form - Centered */}
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                        {errors.submit && (
                            <div className="bg-red/10 border border-red/30 rounded-xl p-4 flex items-center gap-3 text-red font-oswald text-sm animate-shake">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {errors.submit}
                            </div>
                        )}
                        {/* Title */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 hover:border-blue/30 transition-colors">
                            <label className="block font-oswald text-sm text-foreground/80 uppercase tracking-wider mb-3">
                                {t('form.titleLabel')} <span className="text-red">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder={t('form.titlePlaceholder')}
                                className={`w-full bg-blue/10 border ${errors.title ? 'border-red' : 'border-foreground/20'} rounded-xl px-4 py-3 font-oswald text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-blue transition-colors`}
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red font-oswald flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* URL */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 hover:border-blue/30 transition-colors">
                            <label className="block font-oswald text-sm text-foreground/80 uppercase tracking-wider mb-3">
                                {t('form.urlLabel')} <span className="text-red">*</span>
                            </label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder={t('form.urlPlaceholder')}
                                className={`w-full bg-blue/10 border ${errors.url ? 'border-red' : 'border-foreground/20'} rounded-xl px-4 py-3 font-oswald text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-blue transition-colors`}
                            />
                            {errors.url && (
                                <p className="mt-2 text-sm text-red font-oswald flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.url}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 hover:border-blue/30 transition-colors">
                            <label className="block font-oswald text-sm text-foreground/80 uppercase tracking-wider mb-3">
                                {t('form.contentLabel')} <span className="text-red">*</span>
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder={t('form.contentPlaceholder')}
                                rows={12}
                                className={`w-full bg-blue/10 border ${errors.content ? 'border-red' : 'border-foreground/20'} rounded-xl px-4 py-3 font-oswald text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-blue transition-colors resize-none`}
                            />
                            <div className="flex items-center justify-between mt-2">
                                {errors.content ? (
                                    <p className="text-sm text-red font-oswald flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.content}
                                    </p>
                                ) : (
                                    <p className="text-xs text-foreground/40 font-oswald">
                                        {formData.content.length} characters
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 hover:border-blue/30 transition-colors">
                            <label className="block font-oswald text-sm text-foreground/80 uppercase tracking-wider mb-3">
                                {t('form.imageLabel')}
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed ${errors.image ? 'border-red' : 'border-foreground/20'} rounded-xl p-8 text-center cursor-pointer hover:border-blue transition-colors group`}
                            >
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-48 mx-auto rounded-lg"
                                        />
                                        <p className="font-oswald text-sm text-foreground/60">
                                            {t('form.changeImage')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <ImageIcon className="w-12 h-12 text-foreground/40 mx-auto group-hover:text-blue transition-colors" />
                                        <p className="font-oswald text-foreground/60">{t('form.imageButton')}</p>
                                        <p className="text-xs text-foreground/40 font-oswald">{t('form.imageHelp')}</p>
                                    </div>
                                )}
                            </div>
                            {errors.image && (
                                <p className="mt-2 text-sm text-red font-oswald flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Author Attribution Toggle */}
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 hover:border-blue/30 transition-colors flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <label className="block font-oswald text-sm text-foreground/80 uppercase tracking-wider mb-1">
                                    {t('form.showAuthorLabel')}
                                </label>
                                <p className="text-xs text-foreground/40 font-oswald leading-relaxed">
                                    {t('form.showAuthorHelp')}
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input
                                    type="checkbox"
                                    name="showAuthorName"
                                    checked={formData.showAuthorName}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue"></div>
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-red hover:bg-red/90 disabled:bg-red/50 text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-red/30"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t('form.submitting')}
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5" />
                                        {t('form.submitButton')}
                                    </>
                                )}
                            </button>
                            <Link href="/podcasts" className="flex-1">
                                <button
                                    type="button"
                                    className="w-full px-8 py-4 bg-foreground/5 hover:bg-foreground/10 text-foreground font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 border border-foreground/20"
                                >
                                    {t('form.cancel')}
                                </button>
                            </Link>
                        </div>
                    </form>

                    {/* Guidelines - At Bottom */}
                    <div className="mt-16 max-w-3xl mx-auto">
                        <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8 space-y-8">
                            {/* Pitch Section */}
                            {t.raw('guidelines.pitch') && Array.isArray(t.raw('guidelines.pitch')) && (
                                <div className="space-y-4">
                                    {(t.raw('guidelines.pitch') as string[]).map((paragraph, index) => (
                                        <p key={index} className="font-oswald text-base text-foreground/70 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <div className="pt-4 border-t border-foreground/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center border border-blue/30">
                                        <BookOpen className="w-6 h-6 text-blue" />
                                    </div>
                                    <h3 className="font-bebas text-3xl text-foreground">{t('guidelines.title')}</h3>
                                </div>
                                
                                {t.raw('guidelines.rulesHeader') && (
                                    <p className="font-oswald text-lg text-foreground/80 mb-6">
                                        {t('guidelines.rulesHeader')}
                                    </p>
                                )}

                                <ul className="space-y-6">
                                    {(t.raw('guidelines.items') as string[]).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="mt-1 bg-emerald-500/20 rounded-full p-1">
                                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                            </div>
                                            <span 
                                                className="font-oswald text-sm text-foreground/70 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Back Button at Bottom */}
                    <div className="flex justify-center mt-12 relative z-10">
                        <Link href="/podcasts">
                            <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                                <span className="relative z-10 group-hover:text-background transition-colors duration-300">{t('backToArticles')}</span>
                                <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
