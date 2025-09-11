import React from 'react';
import Image from 'next/image';

const Gallery = () => {
  // Data for the design section with images
  const designData = [
    {
      name: 'Hon’ble. Sharadrao Govindrao Pawar',
      title: 'President',
      image: '/images/SP.jpg', // Path to the image
    },
    {
      name: 'Hon’ble Chandrakant Narayan Dalvi, IAS(Retd)',
      title: 'Chairman',
      image: '/images/chairman1.jpg', // Path to the image
    },
    {
      name: 'Hon’ble Dr. Anil Patil',
      title: 'Organizer',
      image: '/images/Organizer.jpg',
    },
    {
      name: 'Hon’ble Adv. Bhagirath Nivrutti Shinde',
      title: 'Vice Chairman',
      image: '/images/VICE.jpeg', // Ensure this image exists
    },
    {
      name: 'Hon’ble Shri. Vikas Deshmukh, IAS(Retd)',
      title: 'Secretary',
      image: '/images/SECRETY.jpeg',
    },
    
  ];

  return (
    <div className="[background-color:hsl(184,50%,85%)] py-8">
      {/* Design Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-dark">
          Leadership Team
        </h2>
        {/* Horizontal Scrolling Container for Mobile */}
        <div className="flex overflow-x-auto scroll-smooth gap-6 pb-4">
          {designData.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-70 bg-white p-4 rounded-lg shadow-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              {/* Member Image */}
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-4 border-blue-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Member Name and Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 font-medium text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
