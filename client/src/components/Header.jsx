import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-400 via-lime-400 to-blue-300 rounded-lg text-white md:mr-1'>
                Quick
            </span>
            Cook
        </Link>
        <form>
            <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color="gray" pill>
                <FaMoon />
            </Button>
            <Link to='/signin'>
                <Button gradientDuoTone={'greenToBlue'} outline >
                    Sign-In
                </Button>
            </Link>
            <NavbarToggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'} className=' active:text-green-400'> 
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'} className=' active:text-green-400'>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}