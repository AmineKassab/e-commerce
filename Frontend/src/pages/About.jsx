import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'}  text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px]' src={assets.about_us1} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Founded with a passion for timeless elegance, our boutique offers refined clothing that blends sophistication with modern trends.</p>
          <p>Each piece is carefully curated to embody style, quality, and craftsmanship.We strive to create a shopping experience as exquisite as the garments we present.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To inspire confidence and individuality through luxury fashion,while upholding the highest standards of quality and design.</p>

        </div>
      </div>
      <div className='text-4xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We are committed to delivering garments that meet the highest standards of craftsmanship and durability. Every piece undergoes rigorous quality checks, ensuring that our customers receive only the finest materials and flawless finishing. Your satisfaction is our priority, and excellence is our promise.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className='text-gray-600'>We design every shopping experience to be effortless and enjoyable. From an intuitive store layout to seamless online browsing, we make it easy for you to find your perfect piece anytime, anywhere.</p>

          
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated team is here to provide personalized assistance at every step. Whether in-store or online, we ensure that each interaction reflects our commitment to care, professionalism, and your complete satisfaction.</p>
          
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About