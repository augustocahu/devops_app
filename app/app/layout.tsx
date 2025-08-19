
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevOps Demo - Task Manager',
  description: 'Aplicação de demonstração para práticas DevOps com CRUD completo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
              <div className="container mx-auto max-w-6xl flex h-16 items-center px-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">DevOps Demo</h1>
                    <p className="text-sm text-gray-500">Task Management System</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Demonstração CRUD Completa</span>
                </div>
              </div>
            </header>
            <main className="container mx-auto max-w-6xl px-4 py-8">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
