import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ThumbsUp, Award, Calendar, FileText, User, Users } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function SubmissionReviewModal({ isOpen, onClose, assignment }) {
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <AnimatePresence>
      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-lg w-full max-w-4xl border border-blue-700 shadow-lg shadow-blue-500/20"
          >
            <div className="max-h-[calc(100vh-40px)] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-blue-400">assignment.title</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-blue-400 transition duration-300 p-1"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="h-5 w-5 text-blue-400" />
                      <span>Assignee: assignment.assigneeName</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-5 w-5 text-blue-400" />
                      <span>Created: assignment.creationDate</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-5 w-5 text-green-400" />
                      <span>Completed: assignment.completedDate</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <ThumbsUp className="h-5 w-5 text-yellow-400" />
                      <span>Student Upvotes: assignment.studentUpvotes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Award className="h-5 w-5 text-purple-400" />
                      <span>Expert Upvotes: assignment.expertUpvotes</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Description</h3>
                  <p className="text-gray-300">assignment.description</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Submission</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-blue-700">
                    {/* <Document
                      file={assignment.pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="flex justify-center"
                    >
                      <Page pageNumber={1} width={300} />
                    </Document> */}
                    {numPages && (
                      <p className="text-center text-gray-400 mt-2">
                        Page 1 of {numPages}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 flex items-center space-x-2"
                  >
                    <Users className="h-5 w-5" />
                    <span>Show All Submissions</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 flex items-center space-x-2"
                  >
                    <FileText className="h-5 w-5" />
                    <span>View Full PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      
    </AnimatePresence>
  )
}