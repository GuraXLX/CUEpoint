import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Setlist Architect', href: '/setlist-architect' },
    { name: 'Track Doctor', href: '/track-doctor' },
    { name: 'Discovery Engine', href: '/discovery' },
    { name: 'Collab Hub', href: '/collab' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Disclosure as="nav" className="bg-card border-b border-white/10">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <MusicalNoteIcon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={clsx(
                                                        location.pathname === item.href
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-300 hover:bg-card-hover hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium transition-colors'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
