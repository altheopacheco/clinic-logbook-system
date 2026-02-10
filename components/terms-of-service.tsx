export default function TermsOfService() {
    return <section id="terms-of-service">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">Last Updated: February 11, 2026</p>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-blue-700 mb-3">1. Acceptance of Terms</h2>
                        <p>By using the School Clinic Logbook, users agree to provide accurate and truthful information. This system is intended solely for official school record-keeping.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-blue-700 mb-3">2. User Responsibilities</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Accuracy:</strong> Users must enter their legal names.</li>
                            <li><strong>Honesty:</strong> Falsifying log times may result in disciplinary action.</li>
                            <li><strong>Privacy:</strong> Tampering with or viewing other students' entries is strictly prohibited.</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-sm text-blue-800 font-medium italic">
                            Disclaimer: While we strive for 100% uptime, the school is not responsible for data loss due to technical failures beyond our control.
                        </p>
                    </div>
                </div>
            </section>

}