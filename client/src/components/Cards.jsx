import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { FaArrowLeft, FaArrowRight, FaUndo } from 'react-icons/fa';

const db = [
  {
    name: 'COPS',
    description: 'Computer Science Society: Dive into the world of tech and coding with COPS, where innovation and collaboration meet.',
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
  },
  {
    name: 'Literary Society',
    description: 'Literary Society: Explore the beauty of words and stories. Join us to discuss, write, and enjoy literature.',
    background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  },
  {
    name: 'Robotics Club',
    description: 'Robotics Club: Unleash your creativity with robotics. Build, program, and compete with your robots.',
    background: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
  {
    name: 'Photography Club',
    description: 'Photography Club: Capture and appreciate moments through the lens. Join us to enhance your photography skills.',
    background: 'linear-gradient(135deg, #f79d00, #f2c14c)',
  },
  {
    name: 'Music Club',
    description: 'Music Club: For all music lovers. Whether you play an instrument or just enjoy music, join us for sessions and jam-outs.',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  }
];

function Cards() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () => Array(db.length).fill(0).map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="cards-container">
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <h1>Club Swipe</h1>
      <div className='cardContainer'>
        {db.map((club, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={`swipe ${index === currentIndex ? 'active-card' : ''}`}
            key={club.name}
            onSwipe={(dir) => swiped(dir, club.name, index)}
            onCardLeftScreen={() => outOfFrame(club.name, index)}
          >
            <div className='card' style={{ background: club.background }}>
              <div className='cardContent'>
                <div className='cardHeader'>{club.name}</div>
                <div className='cardDescription'>{club.description}</div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button onClick={() => goBack()}><FaUndo size={30} /></button>
      </div>
    </div>
  );
}

export default Cards;
