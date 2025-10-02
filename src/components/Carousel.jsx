import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

export default function Carousel() {
  const slides = [
    {
      image: 'https://thebureaufashionweek.com/wp-content/uploads/sites/11/2021/08/What-to-wear-to-Fashion-Week.jpg',
      title: 'Trendy Fashion',
      subtitle: 'Explore the latest styles for every season',
    },
    {
      image: 'https://dlcdnwebimgs.asus.com/gain/46e5809c-669e-4d0c-9d7d-363e4ea6afeb/',
      title: 'Smart Electronics',
      subtitle: 'Upgrade your tech game with top brands',
    },
    {
      image: 'https://updater.com/wp-content/uploads/2014/12/woman-in-grocery-store_new-home-grocery-list-1.webp',
      title: 'Home Essentials',
      subtitle: 'Comfort meets elegance for your space',
    },
    {
      image: 'https://previews.123rf.com/images/zoaarts/zoaarts2001/zoaarts200100096/141214528-vector-illustration-mega-sale-banner-colorful-label-and-sticker-design.jpg',
      title: 'Mega Sale',
      subtitle: 'Up to 70% off on selected items!',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto mb-10"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Optional 3D Canvas Layer */}
              {/* <Canvas className="absolute inset-0 z-0">
                // Add 3D elements here later
              </Canvas> */}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 sm:px-16 text-white z-10"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-4xl font-bold mb-2"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm sm:text-lg"
                >
                  {slide.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}