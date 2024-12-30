
import { UserPlus, BookOpen, MessageSquare, Award } from 'react-feather';

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and set up your profile in minutes.",
    icon: UserPlus,
  },
  {
    title: "Join or Create Classes",
    description: "Easily join existing classes or create your own as a teacher.",
    icon: BookOpen,
  },
  {
    title: "Collaborate",
    description: "Engage in discussions, share resources, and work on projects together.",
    icon: MessageSquare,
  },
  {
    title: "Track Progress",
    description: "Monitor your learning journey and celebrate your achievements.",
    icon: Award,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-400">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

