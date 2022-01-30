import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isOwner }) {
  return (
    <header className="text-gray-600 body-font">
      <div
        className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
        style={{ justifyContent: 'space-between' }}
      >
        <nav className="flex flex-wrap items-center text-base">
          <Link
            to="/"
            className="ml-5 hover:text-gray-900"
            style={{ margin: '0' }}
          >
            Consumer
          </Link>
          <Link to="/mint" className="ml-5  hover:text-gray-900">
            Manufacturer
          </Link>
          {/* <Link to="/consumerPage" className="ml-5 mr-5 hover:text-gray-900">
            Consumer
          </Link> */}
        </nav>
        <div>
          <p className="flex order-first lg:order-none title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <span className="text-l">PUREMeds by &nbsp;</span>
            <a href="https://dappcamp.xyz" target="_blank">
              <img
                src="https://www.dappcamp.xyz/dappcamp_logo.png"
                alt="DappCamp logo"
                style={{ height: '32px' }}
              />
            </a>
          </p>
        </div>
        {/* Fake links to maintain cenetering of elements */}
        <nav className="flex flex-wrap items-center text-base">
          <Link
            to="/"
            className="ml-5 mr-5 hover:text-gray-900"
            style={{ opacity: 0 }}
          >
            Home
          </Link>
          {true && (
            <Link
              to="/mint"
              className=" mr-5 hover:text-gray-900"
              style={{ opacity: 0 }}
            >
              Manufacturer
            </Link>
          )}
          {/* <Link
            to="/consumerPage"
            className="mr-5 hover:text-gray-900"
            style={{ opacity: 0 }}
          >
            Consumer
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
