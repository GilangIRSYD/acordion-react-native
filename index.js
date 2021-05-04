import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native'


/**
 * @author gilangsp
 * 
 * 
 * @param  {String} title='changetitleprops' Title Accordion
 * @param  {JSX} children React Node
 * @param  {number} iconSize=25 Icon leading size
 * @param  {image} iconPNG=undefine Icon leading
 * @param  {image} iconDropdown='Arrow-down' 
 * @param  {number} iconDropdownSize=25
 * @param  {style} styleTextTitle styling for title tex acordion
 * 
 * @example
 * Basic Usage
 * 
 * <CAcordion title={"Kurir apa yang mengantarkan modem orbit ?"} styleTextTitle={{fontSize:24 }}>
 *   <View>
 *       <Text>{'1. Kurir JNE'}</Text>
 *       <Text>{'2. Kurir SI Cepat'}</Text>
 *       <Text>{'3. Kurir J and T'}</Text>
 *       <Text>{'4. Kurir TIKI'}</Text>
 *       <Text>{'5. Kurir GO Send'}</Text>
 *   </View>
 * </CAcordion>
 *
 * 
 * Custom Usage inside Card
 * <View style={{ paddingHorizontal: 24, paddingVertical: 12, elevation: 10, shadowColor: '#232323', shadowRadius: 10, shadowOffset: { width: 3, height: 5 }, shadowOpacity: 0.2, borderRadius: 16 }}>
 *       <CAcordion iconPNG={iconWhatsapp} title={"Example Acordion inside card"} styleTextTitle={{ fontFamily: 'Muli-Bold' }}>
 *           <View style={{ marginBottom: 12 }}>
 *           <Text>{'1. Custom Text'}</Text>
 *           <Text>{'2. Custom Text'}</Text>
 *           <Text>{'3. Custom Text'}</Text>
 *           <Text style={{fontSize:18}}>{'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?'}</Text>
 *           </View>
 *       </CAcordion>
 *   </View>
 * 
 * @see <a href="http://example.com">for more information and scrennshoot</a>.
 */

const initArrowImage = require('./icon-arrow-dropdown.png')
const CAcordion = ({
    title = 'Change title props',
    children,
    iconSize = 25,
    iconPNG = null,
    iconDropdown = initArrowImage,
    iconDropdownSize = 25,
    styleTextTitle
}) => {

    const hasMounted = useRef()

    const animateContainer = useRef(new Animated.Value(55)).current
    const animateIconArrow = useRef(new Animated.Value(0)).current

    const [isOpen, setIsOpen] = useState(false)
    const [childContainerHeight, setChildContainerHeight] = useState(0)

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

        } else {
            Animated.spring(animateContainer, {
                toValue: isOpen ? childContainerHeight + 55 : 55,
                friction: 5,
                useNativeDriver: false
            }).start()

            Animated.spring(animateIconArrow, {
                toValue: isOpen ? 1 : 0,
                friction: 5,
                useNativeDriver: true
            }).start()
        }
    }, [isOpen])

    const _handleToggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const _handleOnLayout = (event) => {
        const { height } = event.nativeEvent.layout
        setChildContainerHeight(Math.ceil(height))
    }

    const _styleImage = {
        transform: [{
            rotate: animateIconArrow.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
            })
        }]
    }

    return (
        <Animated.View style={[styles.mainContainer, { height: animateContainer }]}>
            <TouchableOpacity onPress={_handleToggleDropdown}>
                <View style={styles.titleDropdownContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {
                            !!iconPNG && <Image source={iconPNG} style={[styles.iconTitle, { height: iconSize, width: iconSize }]} />
                        }
                        <Text style={[styles.dropdownTitle, styleTextTitle]}>{title}</Text>
                    </View>
                    <Animated.Image source={iconDropdown} style={[styles.iconDropdown, { height: iconDropdownSize, width: iconDropdownSize }, _styleImage]} />
                </View>
            </TouchableOpacity>
            <View onLayout={_handleOnLayout}>
                {
                    children
                }
            </View>
        </Animated.View>
    )
}

export default CAcordion

const styles = StyleSheet.create({
    mainContainer: {
        overflow: 'hidden',
    },
    iconTitle: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginEnd: 12
    },
    iconDropdown: {
        width: 16,
        height: 16,
    },
    titleDropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    dropdownTitle: {
        color: 'black',
        fontSize: 18
    }
})
