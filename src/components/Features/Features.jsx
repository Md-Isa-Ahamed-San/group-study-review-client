
import { BookOpen, Users, Calendar, Award } from 'react-feather';

const features = [
  {
    title: "Virtual Classrooms",
    description: "Attend classes from anywhere with our interactive virtual classroom environment.",
    icon: BookOpen,
  },
  {
    title: "Collaboration Tools",
    description: "Work together on projects, share resources, and communicate easily with classmates.",
    icon: Users,
  },
  {
    title: "Schedule Management",
    description: "Keep track of classes, assignments, and events with our intuitive calendar system.",
    icon: Calendar,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your academic progress and receive personalized insights to improve your performance.",
    icon: Award,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-400">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

