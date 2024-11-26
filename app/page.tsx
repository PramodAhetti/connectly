import { QrCode, Users, Share2 } from 'lucide-react';
import { signIn,signOut,useSession } from 'next-auth/react';
import LoginButton from './component/loginGoogle';
export default function Home() {
  return (
    <div className="w-full overflow-x-hidden font-mono">
      <nav className="flex flex-row items-center justify-between px-4 py-2 m-2">
        <QrCode height={20} width={20} />
        <a href='#about' className="text-sm px-4 py-2 bg-blue-500 text-white rounded-lg">
          About
        </a>
      </nav>

      <div className="h-28"></div>
      <div className='flex flex-col justify-center items-center text-center'>
        <QrCode height={300} width={250} className='m-10' />
        <h1 className="text-4xl font-bold m-10">CONNECTLY</h1>
        <p className="text-center max-w-md mx-auto">
          Quickly Share Contacts Instantly with Qr Code
        </p>
        <div className='h-10'></div>
        <LoginButton></LoginButton>
      </div>
      <div className="h-16"></div>
      <section id='about' className='mt-16'>
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">How Connectly Works</h2>
          <div className="grid md:grid-cols-3 gap-8 justify-center items-center">
            <div className="flex flex-col items-center p-6 rounded-lg">
              <Users className="mb-4" size={48} />
              <h3 className="mb-4">Create Profile</h3>
              <p>Build your digital business card with ease</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg">
              <QrCode className="mb-4" size={48} />
              <h3 className="mb-4">Generate QR</h3>
              <p>Generate unique QR codes for instant sharing</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg">
              <Share2 className="mb-4" size={48} />
              <h3 className="mb-4">Connect Instantly</h3>
              <p>Share contacts with a simple scan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 Connectly. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}
