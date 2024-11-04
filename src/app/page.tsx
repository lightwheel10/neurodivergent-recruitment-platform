import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="font-semibold text-gray-900">NeuroDev</span>
          </div>
          <Link 
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Neurodiversity is Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Superpower</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Connect with forward-thinking companies that value your unique perspective and abilities. Transform workplace diversity into innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/register"
                  className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
                >
                  Start Your Journey
                </Link>
                <a 
                  href="#how-it-works"
                  className="text-gray-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto text-center"
                >
                  Learn More
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <strong className="text-blue-600">500+</strong> candidates already joined
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-3" />
              <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { title: 'Direct Placement', value: '80%' },
                    { title: 'Partner Companies', value: '100+' },
                    { title: 'Success Rate', value: '95%' },
                    { title: 'Support Hours', value: '24/7' },
                  ].map((stat) => (
                    <div key={stat.title} className="p-4 md:p-6 rounded-xl bg-gray-50">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-600">{stat.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gray-50" id="how-it-works">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to highlight your unique abilities and match you with companies that embrace neurodiversity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Create Your Profile',
                description: 'Share your unique strengths and abilities in a safe, understanding environment.',
                icon: '📝'
              },
              {
                title: 'Get Matched',
                description: 'Our system connects you with companies looking for your specific talents.',
                icon: '🤝'
              },
              {
                title: 'Succeed Together',
                description: 'Receive ongoing support as you thrive in your new role.',
                icon: '🌟'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who found their perfect role through our platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                quote: "This platform helped me find a company that truly values my unique way of thinking. I&apos;m now thriving in my role as a software developer.",
                name: "Alex M.",
                role: "Software Developer"
              },
              {
                quote: "For the first time, I felt my neurodiversity was seen as an asset rather than a challenge. The matching process was seamless.",
                name: "Sam K.",
                role: "Data Analyst"
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 p-6 md:p-8 rounded-xl">
                <div className="text-gray-600 mb-6 text-sm md:text-base">&ldquo;{testimonial.quote}&rdquo;</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
            Join our community of neurodivergent professionals and find your dream role.
          </p>
          <Link 
            href="/register"
            className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Create Your Profile
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 opacity-80" />
              <span className="font-semibold text-white">NeuroDev</span>
            </div>
            <div className="text-xs md:text-sm">
              © 2024 NeuroDev. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
