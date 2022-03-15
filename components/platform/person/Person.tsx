import character1 from '../../../public/assets/people/character_1.png';
import character2 from '../../../public/assets/people/character_2.png';
import character3 from '../../../public/assets/people/character_3.png';
import character4 from '../../../public/assets/people/character_4.png';

function Person({position, direction}) {
    return (
        <div className="person">
            <div className="person__asset" style={{ backgroundImage: `url(${character1.src})` }}></div>
            {/* <div style={{backgroundImage: `url(${character2.src})`}}></div> */}
            {/* <div style={{backgroundImage: `url(${character3.src})`}}></div> */}
            {/* <div style={{backgroundImage: `url(${character4.src})`}}></div> */}
        </div>
    )
}

export default Person;
