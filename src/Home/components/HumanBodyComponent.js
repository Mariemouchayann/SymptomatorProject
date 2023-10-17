import React, { useLayoutEffect, useState } from 'react'
import Chest from '../../Home/assets/BodyPartsSvg/Chest'
import Belly from '../../Home/assets/BodyPartsSvg/Belly'
import Head from '../../Home/assets/BodyPartsSvg/Head'
import Waist from '../../Home/assets/BodyPartsSvg/Waist'
import LeftHand from '../../Home/assets/BodyPartsSvg/LeftHand'
import RightHand from '../../Home/assets/BodyPartsSvg/RightHand'
import RightFoot from '../../Home/assets/BodyPartsSvg/RightFoot'
import LeftFoot from '../../Home/assets/BodyPartsSvg/LeftFoot'
import RightArm from '../../Home/assets/BodyPartsSvg/RightArm'
import LeftArm from '../../Home/assets/BodyPartsSvg/LeftArm'
import Back from '../assets/BodyPartsSvg/Back'
import redcircle from '../assets/redcircle.gif'
import { useGlobalContext } from '../../GlobalContext'
import HumanPopUp from './HumanPopUp'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


function HumanBodyComponent() {


    let FrontBodyPartsSvg = [
        { name: 'left_hand', svg: <LeftHand isFront={true} />, onClick: e => showPopUp(e, 'hands') },
        { name: 'right_hand', svg: <RightHand isFront={true} />, onClick: e => showPopUp(e, 'hands') },
        { name: 'left_foot', svg: <LeftFoot isFront={true} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'right_foot', svg: <RightFoot isFront={true} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'left_arm', svg: <LeftArm isFront={true} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'right_arm', svg: <RightArm isFront={true} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'chest', svg: <Chest />, onClick: e => showPopUp(e, 'chest') },
        { name: 'belly', svg: <Belly />, onClick: e => showPopUp(e, 'belly') },
        { name: 'Head', svg: <Head />, onClick: e => showPopUp(e, 'head') },
        { name: 'Waist', svg: <Waist />, onClick: e => showPopUp(e, 'waist') },
    ]
    
    let BackBodyPartsSvg = [
        { name: 'left_hand', svg: <LeftHand isFront={false} />, onClick: e => showPopUp(e, 'hands') }, 
        { name: 'right_hand', svg: <RightHand isFront={false} />, onClick: e => showPopUp(e, 'hands') },
        { name: 'left_foot', svg: <LeftFoot isFront={false} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'right_foot', svg: <RightFoot isFront={false} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'left_arm', svg: <LeftArm isFront={false} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'right_arm', svg: <RightArm isFront={false} />, onClick: e => showPopUp(e, 'feet') },
        { name: 'Head', svg: <Head />, onClick: e => showPopUp(e, 'head') },
        { name: 'Back', svg: <Back />, onClick: e => showPopUp(e, 'back') },
    ]
    
    const [zoomLevel, setZoomLevel] = useState(1);
    let state = useGlobalContext()
    let [SelectedElements, setSelectedElements] = state.SelectedElements
    let symptoms = state.symptoms
    let [RedCircles, setRedCircles] = state.RedCircles

    const [PartElements, setPartElements] = useState({ name: '', elements: [] })
    const [HidePopUp, setHidePopUp] = useState(true)
    const [Elements, setElements] = useState([])
    const [IsFront, setIsFront] = useState('front')
    const [MouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
    const [PopUpCoordinates, setPopUpCoordinates] = useState({ x: 0, y: 0 })
    
    let showPopUp = (e, bodyPart) => {
        let bodyImageContainer = document.getElementById('body_image_container')
        setMouseCoordinates({ x: ((e.pageX-7.5)/bodyImageContainer.offsetWidth)*100, y: ((e.pageY-7.5)/bodyImageContainer.offsetHeight)*100 })
        setPopUpCoordinates({ x: e.clientX, y: e.clientY })
        setHidePopUp(false)
        let bodyPartsObj = symptoms[bodyPart]
        setElements(bodyPartsObj.elements)
        setPartElements(bodyPartsObj)
    }

    let IsElementSelected = (element) => SelectedElements.find(e => e === element)

    let selectElement = (element) => {
        let selected = IsElementSelected(element)
        if(selected) {
            delete RedCircles[element]
            setRedCircles(RedCircles)
            let elements = SelectedElements.filter(e => e !== element)
            setSelectedElements([...elements])
        }
        else {
            RedCircles[element] = { x: MouseCoordinates.x, y: MouseCoordinates.y, side: IsFront }
            setRedCircles(RedCircles)
            setSelectedElements([...SelectedElements, element])
        }
    }

    let search = (e) => {
        let filtredElements = PartElements.elements.filter(el => el.toLowerCase().includes(e.toLowerCase()))
        setElements(filtredElements)
    }
    
    let rotate = () => {
        setIsFront('loading')
        let HumanBody = document.getElementById('human_body')
        let j = 1

        if(IsFront === 'front') {
            j = 37
            let interval = setInterval(() => {
                let HumanBody = document.getElementById('human_body');

                HumanBody.src = './3dBody/body_000' + j.toString().padStart(2, 0) +'.jpg'
                j = j+1
                if(j > 73) clearInterval(interval)
            }, 33)

            setTimeout(() => {
                setIsFront('back')
            }, 1400)
        }
        else if(IsFront === 'back') {
            j = 1
            let interval = setInterval(() => {
                HumanBody.src = './3dBody/body_000' + j.toString().padStart(2, 0) +'.jpg'
                j = j+1
                if(j > 37) clearInterval(interval)
            }, 33)
        
            setTimeout(() => {
                setIsFront('front')
            }, 1400)
        }
    }
    
    useLayoutEffect(() => {
        rotate()
    }, [])

    return (
        
        <div className="human_body_component">
            <div className="human_body_handler" id='body_image_container'>
                {
                    IsFront === 'front' ?
                    BackBodyPartsSvg.map((bps, i) => {
                        return <div key={i} onClick={bps?.onClick}>{bps.svg}</div>
                    }) : 
                    IsFront === 'back' ?
                    FrontBodyPartsSvg.map((bps, i) => {
                        return <div key={i} onClick={bps?.onClick}>{bps.svg}</div>
                    }) : 
                    <></>
                }

                <div className='red_circles_container'>
                {
                        Object.keys(RedCircles).map((rc, i) => {
                            return RedCircles[rc].side === IsFront && <img src={redcircle} key={i} style={{ top: RedCircles[rc].y+'%', left: RedCircles[rc].x+'%'}} alt='' />
                        }
                            
                            
                        )
                }
                    
                    
                </div>                
                <div className="body_btns_container">
                    <button className='rotate_btn' onClick={rotate}>                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.001" height="12" viewBox="0 0 20.001 12"><path id="Path_1" data-name="Path 1" d="M16,10c5.7,0,10,2.1,10,5,0,2.4-3.2,4.4-7.7,4.9l.4.4a.99.99,0,1,1-1.4,1.4l-2-2c-.1-.1-.2-.2-.2-.3a1.1,1.1,0,0,1,0-.8c0-.1.1-.2.2-.3l2-2a.99.99,0,0,1,1.4,1.4l-.1.1C22,17.3,24,16,24,15c0-1.2-3.1-3-8-3s-8,1.8-8,3c0,.8,1.5,2,4.2,2.6a1.02,1.02,0,0,1-.4,2C8.2,18.8,6,17.1,6,15,6,12.1,10.3,10,16,10Z" transform="translate(-5.997 -10)" fill="#20a8d3"/></svg>
                    </button>

                </div>

                <div  className='human_body_imgs_container'>
                    <img id='human_body' src={'./3dBody/body_00001.jpg'} alt="human body" className='' />
                </div>
               
            </div>
            <HumanPopUp props={{HidePopUp, setHidePopUp, search, PopUpCoordinates, PartElements, Elements, selectElement, IsElementSelected } } />
        </div>
    )
}

export default HumanBodyComponent