'use client'

import { ArrowUpDown, ChevronDown, ChevronUp, FileText, Star, ThumbsUp, X } from 'lucide-react'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const initialSubmissions = [
  { id: 1, user: { name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40' }, submissionDate: '2024-03-15T14:30:00Z', content: 'This is Alice\'s submission for the task...', studentUpvotes: 5, expertUpvotes: 2, pdfUrl: '/sample.pdf', userUpvoted: false, expertUpvoted: false },
  { id: 2, user: { name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40' }, submissionDate: '2024-03-14T10:00:00Z', content: 'Bob\'s approach to solving the problem...', studentUpvotes: 3, expertUpvotes: 1, pdfUrl: '/sample.pdf', userUpvoted: false, expertUpvoted: false },
  { id: 3, user: { name: 'Charlie Brown', avatar: '/placeholder.svg?height=40&width=40' }, submissionDate: '2024-03-16T16:45:00Z', content: 'Charlie\'s innovative solution to the task...', studentUpvotes: 7, expertUpvotes: 3, pdfUrl: '/sample.pdf', userUpvoted: false, expertUpvoted: false },
  { id: 4, user: { name: 'Diana Prince', avatar: '/placeholder.svg?height=40&width=40' }, submissionDate: '2024-03-15T12:15:00Z', content: 'Diana\'s detailed analysis and submission...', studentUpvotes: 6, expertUpvotes: 2, pdfUrl: '/sample.pdf', userUpvoted: false, expertUpvoted: false },
  { id: 5, user: { name: 'Ethan Hunt', avatar: '/placeholder.svg?height=40&width=40' }, submissionDate: '2024-03-17T09:30:00Z', content: 'Ethan\'s unique perspective on the problem...', studentUpvotes: 4, expertUpvotes: 1, pdfUrl: '/sample.pdf', userUpvoted: false, expertUpvoted: false },
];

export default function ViewAllSubmissions({ taskTitle = "Advanced Algorithm Analysis" }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('submissionDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const toggleExpand = (id) => {
    setExpandedSubmission(expandedSubmission === id ? null : id);
  };

  const handleUpvote = (id, type) => {
    setSubmissions(prevSubmissions => 
      prevSubmissions.map(submission => {
        if (submission.id === id) {
          if (type === 'student') {
            return { 
              ...submission, 
              studentUpvotes: submission.userUpvoted ? submission.studentUpvotes - 1 : submission.studentUpvotes + 1,
              userUpvoted: !submission.userUpvoted 
            };
          } else {
            return { 
              ...submission, 
              expertUpvotes: submission.expertUpvoted ? submission.expertUpvotes - 1 : submission.expertUpvotes + 1,
              expertUpvoted: !submission.expertUpvoted 
            };
          }
        }
        return submission;
      })
    );
  };

  const openPdf = (url) => {
    setSelectedPdf(url);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  const sortedAndFilteredSubmissions = submissions
    .filter(submission => 
      submission.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'submissionDate') {
        return sortOrder === 'asc' 
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      } else if (sortCriteria === 'studentUpvotes') {
        return sortOrder === 'asc' ? a.studentUpvotes - b.studentUpvotes : b.studentUpvotes - a.studentUpvotes;
      } else if (sortCriteria === 'expertUpvotes') {
        return sortOrder === 'asc' ? a.expertUpvotes - b.expertUpvotes : b.expertUpvotes - a.expertUpvotes;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 p-6">
      <div className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] border border-[#1F2A40] rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#00FFD1] mb-2">All Submissions: {taskTitle}</h1>
          <p className="text-gray-400">View and compare submissions from all group members</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="px-4 py-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            >
              <option value="submissionDate">Submission Date</option>
              <option value="studentUpvotes">Student Upvotes</option>
              <option value="expertUpvotes">Expert Upvotes</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-[#141B2D] border border-[#1F2A40] rounded-md text-white hover:bg-[#1F2A40] focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {sortedAndFilteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-gradient-to-br from-[#1F2A40] to-[#141B2D] border border-[#1F2A40] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <img src={submission.user.avatar} alt={submission.user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="text-sm font-medium text-white">{submission.user.name}</h3>
                    <p className="text-xs text-gray-400">Submitted on {new Date(submission.submissionDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpvote(submission.id, 'student')}
                    className={`flex items-center text-sm ${submission.userUpvoted ? 'text-[#00FFD1]' : 'text-gray-400'} hover:text-[#00FFD1]/80`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" /> {submission.studentUpvotes}
                  </button>
                  <button
                    onClick={() => handleUpvote(submission.id, 'expert')}
                    className={`flex items-center text-sm ${submission.expertUpvoted ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300`}
                  >
                    <Star className="h-4 w-4 mr-1" /> {submission.expertUpvotes}
                  </button>
                </div>
              </div>
              {/* <p className="text-sm text-gray-300 mb-2">
                {expandedSubmission === submission.id ? submission.content : `${submission.content.slice(0, 150)}...`}
              </p> */}
              <div className="flex justify-between items-center">
                {submission.content.length > 150 && (
                  <button
                    onClick={() => toggleExpand(submission.id)}
                    className="text-sm text-[#00FFD1] hover:text-[#00FFD1]/80 focus:outline-none"
                  >
                    {expandedSubmission === submission.id ? (
                      <>Show Less <ChevronUp className="inline-block ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="inline-block ml-1 h-4 w-4" /></>
                    )}
                  </button>
                )}
                <button
                  onClick={() => openPdf(submission.pdfUrl)}
                  className="flex items-center text-sm text-[#00FFD1] hover:text-[#00FFD1]/80 focus:outline-none"
                >
                  <FileText className="h-4 w-4 mr-1" /> View PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Submission PDF</h2>
              <button onClick={closePdf} className="text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[80vh] overflow-auto">
              <Document file={selectedPdf}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}