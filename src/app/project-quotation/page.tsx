'use client';

import Link from 'next/link';

export default function ProjectQuotationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📋 PROJECT QUOTATION
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Karimnagar Dairy Sales Management System
          </h2>
          <p className="text-lg text-gray-600">
            <em>Custom Development Proposal for Karimnagar Cooperative Dairy</em>
          </p>
        </div>

        {/* Quotation I */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-indigo-500">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-4">🥇</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Quotation I – Enterprise Smart Platform
              </h3>
              <p className="text-lg text-gray-600">(Scalable for Multi-Branch Use)</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-indigo-900 mb-4">Investment Details</h4>
              <div className="text-3xl font-bold text-indigo-700 mb-2">₹9,80,000 + GST</div>
              <div className="text-sm text-gray-600 mb-4">Timeline: 3.5 months + 2 weeks buffer</div>
              
              <h5 className="font-semibold text-gray-900 mb-2">Payment Schedule:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ₹3,50,000 on contract signing</li>
                <li>• ₹2,50,000 on executive & ZM dashboard demo</li>
                <li>• ₹2,50,000 after complete internal testing</li>
                <li>• ₹1,30,000 on final deployment & handover</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Development Team (8 specialists)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Project Manager</span>
                  <span className="font-semibold">₹1,20,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Lead Full-stack Developer</span>
                  <span className="font-semibold">₹2,80,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Frontend Specialist</span>
                  <span className="font-semibold">₹1,50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Backend API Developer</span>
                  <span className="font-semibold">₹1,40,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Database Architect</span>
                  <span className="font-semibold">₹1,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>DevOps Engineer</span>
                  <span className="font-semibold">₹90,000</span>
                </div>
                <div className="flex justify-between">
                  <span>QA Testing Specialist</span>
                  <span className="font-semibold">₹70,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Engineer (3 months)</span>
                  <span className="font-semibold">₹30,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">✅ Advanced Features Included</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-indigo-700">Smart Operations</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Real-time GPS tracking for executives</li>
                    <li>• Visit photo capture with geo-tagging</li>
                    <li>• AI-powered sales forecasting</li>
                    <li>• ChatGPT management assistant</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-indigo-700">Enterprise Analytics</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Advanced target vs achievement graphs</li>
                    <li>• Predictive analytics & alert systems</li>
                    <li>• Multi-zone comparison dashboards</li>
                    <li>• Custom report generation</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-indigo-700">Admin Panel (Master Control)</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Add/edit/delete employee profiles</li>
                    <li>• Assign roles & generate employee IDs</li>
                    <li>• Manage zones, areas, sub-areas</li>
                    <li>• Password reset & user management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Platform & Service Costs (Annual)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Google Maps API</span>
                  <span>₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Vercel Pro Hosting</span>
                  <span>₹18,000</span>
                </div>
                <div className="flex justify-between">
                  <span>MongoDB Atlas</span>
                  <span>₹24,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Domain + SSL</span>
                  <span>₹3,000</span>
                </div>
                <div className="flex justify-between">
                  <span>SMS Service</span>
                  <span>₹8,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Service</span>
                  <span>₹6,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Cloud Storage</span>
                  <span>₹12,000</span>
                </div>
                <div className="flex justify-between">
                  <span>ChatGPT API</span>
                  <span>₹20,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitoring Tools</span>
                  <span>₹10,000</span>
                </div>
                <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                  <span>Platform Fees Total</span>
                  <span>₹1,16,000/year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              📝 <strong>Note:</strong> This is an enterprise-grade platform ideal for multi-dairy or state-level operations.
            </p>
          </div>
        </div>

        {/* Quotation II */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-green-500">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-4">✅</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Quotation II – Production-Ready Dairy Sales Platform
              </h3>
              <p className="text-lg text-gray-600">(Built for Your Operations)</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-900 mb-4">Investment Details</h4>
              <div className="text-3xl font-bold text-green-700 mb-2">₹5,40,000 + GST</div>
              <div className="text-sm text-gray-600 mb-4">Timeline: 2 months + 2 weeks buffer</div>
              
              <h5 className="font-semibold text-gray-900 mb-2">Payment Schedule:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ₹2,20,000 on agreement signing</li>
                <li>• ₹1,70,000 on agent & executive module completion</li>
                <li>• ₹1,50,000 on final testing & deployment</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Development Team (5 specialists)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lead Full-stack Developer</span>
                  <span className="font-semibold">₹2,20,000</span>
                </div>
                <div className="flex justify-between">
                  <span>MongoDB Specialist</span>
                  <span className="font-semibold">₹80,000</span>
                </div>
                <div className="flex justify-between">
                  <span>UI/UX Integration Expert</span>
                  <span className="font-semibold">₹90,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Admin Panel Developer</span>
                  <span className="font-semibold">₹60,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployment Specialist</span>
                  <span className="font-semibold">₹50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>QA Tester</span>
                  <span className="font-semibold">₹40,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">✅ Core Features Included</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-green-700">Essential Operations</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Agent daily sales entry with remarks</li>
                    <li>• Executive visit tracking & agent remarks</li>
                    <li>• Pending/Complete status management</li>
                    <li>• Role-based hierarchy access</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-700">Real-Time Reporting</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Live data flow: Agent → Executive → ZM → AGM → Management</li>
                    <li>• Mobile-responsive design</li>
                    <li>• Professional dashboard interfaces</li>
                    <li>• Export capabilities</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-700">Admin Panel (Master Control)</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Employee management with role assignment</li>
                    <li>• Zone/area/sub-area management</li>
                    <li>• Automatic employee ID generation</li>
                    <li>• Password reset & user deactivation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Platform & Service Costs (Annual)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vercel Hosting</span>
                  <span>₹0 (Free tier)</span>
                </div>
                <div className="flex justify-between">
                  <span>MongoDB Atlas Shared</span>
                  <span>₹6,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Domain</span>
                  <span>₹1,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Basic SSL</span>
                  <span>₹0 (Free)</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Service (Basic)</span>
                  <span>₹3,000</span>
                </div>
                <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                  <span>Platform Fees Total</span>
                  <span>₹10,500/year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-700">
              📝 <strong>Note:</strong> This is a production-grade system built specifically for your dairy's workflow, hierarchy, and reporting needs — no bloat, no distractions.
            </p>
          </div>
        </div>

        {/* Quotation III */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-orange-500">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-4">🚀</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Quotation III – Demo / Starter Dairy Entry System
              </h3>
              <p className="text-lg text-gray-600">(Basic Entry Tool)</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-orange-900 mb-4">Investment Details</h4>
              <div className="text-3xl font-bold text-orange-700 mb-2">₹1,80,000 + GST</div>
              <div className="text-sm text-gray-600 mb-4">Timeline: 3 weeks + 1 week buffer</div>
              
              <h5 className="font-semibold text-gray-900 mb-2">Payment Schedule:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ₹90,000 on project start</li>
                <li>• ₹60,000 on completion & testing</li>
                <li>• ₹30,000 on final delivery</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Development Team (4 people)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>UI Developer using Cursor</span>
                  <span className="font-semibold">₹70,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Backend data flow developer</span>
                  <span className="font-semibold">₹60,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Export + filter logic</span>
                  <span className="font-semibold">₹30,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Tester & uploader</span>
                  <span className="font-semibold">₹20,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">✅ Basic Features Included</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-orange-700">Simple Operations</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Static login links (agent/viewer)</li>
                    <li>• Zone → Area → Sub-area selection dropdowns</li>
                    <li>• Agent daily form: quantity + remarks</li>
                    <li>• Viewer access to all entries live</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-orange-700">Basic Reporting</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    <li>• Daily Excel/CSV export of sales</li>
                    <li>• Minimal role-based data separation</li>
                    <li>• Basic data entry interface</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Platform & Service Costs (Annual)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vercel Hosting (Free tier)</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>JSON/MongoDB Backend</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>Basic Domain (optional)</span>
                  <span>₹1,500</span>
                </div>
                <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                  <span>Platform Fees Total</span>
                  <span>₹1,500/year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-700">
              📝 <strong>Note:</strong> This is a lightweight data entry tool suitable for temporary use or internal testing only. Not recommended for production operations.
            </p>
          </div>
        </div>

        {/* Engineering Commitment Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🔧 Engineering Commitment Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold">Quotation</th>
                  <th className="px-4 py-3 text-center font-semibold">Development Time</th>
                  <th className="px-4 py-3 text-center font-semibold">Team Engagement</th>
                  <th className="px-4 py-3 text-center font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-indigo-700">I – Enterprise Platform</td>
                  <td className="px-4 py-3 text-center">3.5 months full-time</td>
                  <td className="px-4 py-3 text-center">8 dedicated engineers</td>
                  <td className="px-4 py-3 text-center text-sm">Full-cycle development, scalable nationwide</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-semibold text-green-700">II – Core Sales System</td>
                  <td className="px-4 py-3 text-center">~2 months part-time</td>
                  <td className="px-4 py-3 text-center">5 focused contributors</td>
                  <td className="px-4 py-3 text-center text-sm">Balanced, structured, production-ready</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-orange-700">III – Basic Website</td>
                  <td className="px-4 py-3 text-center">2–3 weeks (few hours/week)</td>
                  <td className="px-4 py-3 text-center">Small utility team</td>
                  <td className="px-4 py-3 text-center text-sm">Lightweight app for temporary or internal use only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Demo Website Fee */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">🎯 Demo Website Development Fee</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Current Demo Website Cost</h4>
              <div className="text-3xl font-bold mb-2">₹50,000 + GST</div>
              <p className="text-lg mb-4">
                Professional demo website development including:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Complete UI/UX design and development</li>
                <li>• Role-based demo login system</li>
                <li>• Interactive dashboards for all hierarchy levels</li>
                <li>• Professional presentation-ready interface</li>
                <li>• Deployment and hosting setup</li>
              </ul>
            </div>
            <div className="bg-white/20 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4">🎁 Complimentary Service</h4>
              <div className="text-2xl font-bold mb-4">FREE Demo Website!</div>
              <p className="text-lg mb-4">
                Professional demo website development is included at no additional cost with any project quotation.
              </p>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-center font-semibold">
                ₹50,000 Value - Completely FREE!
              </div>
            </div>
          </div>
        </div>

        {/* Updated Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Complete Cost Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold">Component</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation I</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation II</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation III</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Development Team</td>
                  <td className="px-4 py-3 text-center">₹8,80,000</td>
                  <td className="px-4 py-3 text-center">₹5,40,000</td>
                  <td className="px-4 py-3 text-center">₹1,80,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Annual Platform Costs</td>
                  <td className="px-4 py-3 text-center">₹1,16,000</td>
                  <td className="px-4 py-3 text-center">₹10,500</td>
                  <td className="px-4 py-3 text-center">₹1,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Demo Website</td>
                  <td className="px-4 py-3 text-center text-green-600">FREE</td>
                  <td className="px-4 py-3 text-center text-green-600">FREE</td>
                  <td className="px-4 py-3 text-center text-green-600">FREE</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-4 py-3 font-semibold">First Year Total</td>
                  <td className="px-4 py-3 text-center font-bold text-indigo-700">₹9,96,000</td>
                  <td className="px-4 py-3 text-center font-bold text-green-700">₹5,50,500</td>
                  <td className="px-4 py-3 text-center font-bold text-orange-700">₹1,81,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Subsequent Years</td>
                  <td className="px-4 py-3 text-center font-semibold">₹1,16,000</td>
                  <td className="px-4 py-3 text-center font-semibold">₹10,500</td>
                  <td className="px-4 py-3 text-center font-semibold">₹1,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Detailed Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold">Features</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation I</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation II</th>
                  <th className="px-4 py-3 text-center font-semibold">Quotation III</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Agent Daily Sales Entry</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Executive Visit Tracking</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Role-based Hierarchy Access</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Mobile-Responsive Design</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Export Capabilities (Excel/CSV)</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Admin Panel (Master Control)</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Real-time GPS Tracking</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Photo Capture with Geo-tagging</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">AI Sales Forecasting</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">ChatGPT Management Assistant</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Advanced Analytics & Graphs</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Predictive Analytics & Alerts</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Multi-zone Comparison Dashboards</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Custom Report Generation</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Offline Support (PWA)</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Incentive Tracking</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Attendance Reports</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Audit Logs & Backup Tools</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                  <td className="px-4 py-3 text-center text-2xl">❌</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-medium">Demo Website (FREE)</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                  <td className="px-4 py-3 text-center text-2xl">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🛡️ Quality Guarantee</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Professional grade development using industry standards</li>
                <li>✅ Production-ready code with proper documentation</li>
                <li>✅ Post-deployment support included in timeline</li>
                <li>✅ Scalable architecture for future growth</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What's NOT Included (Your Responsibility):</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• GST (18% on total amount)</li>
                <li>• Any hardware purchases</li>
                <li>• Staff training (if required)</li>
                <li>• Data migration from existing systems</li>
                <li>• Changes in scope after final approval</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Protection */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h4 className="text-xl font-semibold text-blue-900 mb-2">🎯 Payment Protection</h4>
          <p className="text-blue-800">
            All platform costs are <strong>prepaid for 1 year</strong> and included in the quotation. 
            <strong>No surprise bills later!</strong>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 