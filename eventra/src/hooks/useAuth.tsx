import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const useAuth = () => {
    const [data, setData] = useState("");
    return ({ data, setData })
}

export default useAuth