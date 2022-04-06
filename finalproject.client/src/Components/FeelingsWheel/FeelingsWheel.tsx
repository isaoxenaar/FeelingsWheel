import wheel from '/finalproject.client/src/Assets/feelingsWheelpng.png';
import './feelingsWheel.css';

const FeelingsWheel = () => {    
    const stop = () => {
        const wheel = document.getElementById('feelingsWheel');
        wheel?.setAttribute('class', 'rotation' );
    }
    
    return (
        <>
        <section>
            <h1>Spin the Wheel</h1>
            <img src={'https://i.postimg.cc/3xRTHN29/feelings-Wheelpng.png'} className='feelingsWheel' id='feelingsWheel' onClick={stop} alt='Feelings Wheel'/>
        </section>
        </>
    )
}

export default FeelingsWheel;