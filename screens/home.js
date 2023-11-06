import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, Touchable, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
    const navigator = useNavigation()
    const url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=20'
    const [geral, setGeral] = useState([])
    const [noticias, setNoticias] = useState([])
    const [descricao, setDescricao] = useState()
    const [exibir, setExibir] = useState(false)
    const [salvo, setSalvo] = useState('')
    const [link, setLink] = useState()
    const api = async () => {
        const result = await fetch(url)
        const formatResult = await result.json()
        setGeral(formatResult)
        setNoticias(geral.items)
    }
 
    useEffect(() => {
        api()
    }, [])
    console.log(salvo)
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList data={noticias} renderItem={({ item }) => (
                <View>
                    <Modal transparent={true} visible={exibir} animationType='slide'>
                        <View style={styles.tamModal}>
                            <View style={styles.centralModal}> 
                                <Text style={styles.descricao} >{descricao}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.bot}>
                                    <Text style={styles.textBot}>Ver notícia completa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={()=>setSalvo(item.link)} style={styles.bot}>
                                    <Text style={styles.textBot}>SALVAR NOTÍCIA</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setExibir(false )} style={styles.bot}>
                                    <Text style={styles.textBot}>FECHAR</Text>
                                </TouchableOpacity> 
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => {
                        setExibir(true),
                        setDescricao(item.introducao), setLink(item.link)
                    }}
                        style={styles.card}>

                        <Text style={styles.titulo}>{item.titulo}</Text>
                    </TouchableOpacity>
                </View> 


            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    }, 
    card:{
        backgroundColor:'gray',
        marginBottom:5,
        padding:10,
        borderRadius:10,
    }, 
    titulo:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
    },
      centralModal: {
        margin: 20,
        backgroundColor:'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
      },
      tamModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
       
      },
      bot:{
        backgroundColor:'#d0d0d0',
        borderRadius:10,
        padding:10,
        marginTop:10
      },
      textBot:{
        fontSize:15,
        fontWeight:'bold',
        color:'#292929'
      },
       descricao:{
        fontWeight:'bold',
        fontSize:20
       }
});
