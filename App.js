import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    TextInput
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {useEffect, useState} from "react";


export default function App() {
    const [quote, setQuote] = useState([]);
    const [quoteList, setQuoteList] = useState([]);
    const [number, setNumber] = useState([]);
    const LeftContent = props => <Avatar.Icon {...props}/>


    const getQuote = () => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
              console.log(data);
              setQuote(data);
            }
        )
  }
  const getANumberOfQuote = () => {
    fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${number}`)
        .then(response => response.json())
        .then(data => {
              console.log(data);
            setQuoteList(data);
            }
        )
  }

    const onPressQuote= () => {
        //console.log("test")
        getANumberOfQuote()

        //console.log(goalList)
    };

    const inputAddQuote = () => {
        return (
            <TextInput
                style={styles.input}
                onChangeText={setNumber}
                value={number}
                placeholder='Entrer ici'
            />
        )
    }
  useEffect(() => {

    (async () => {
      getQuote()
    })();

  }, []);

    const callApi = () => {
        getQuote()
    }

    const Item = ({ quote }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{quote}</Text>
        </View>
    )

    const Quotes = ({ quoteList }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{quoteList}</Text>
        </View>
    )


    const renderItem = ({ item }) => (
        <View >
            <Card>
                <Card.Title title={item.character} subtitle="" left={LeftContent} />
                <Card.Cover source={{ uri: item.image }} resizeMode={'contain'}/>
                <Card.Content>
                    <Title><Item quote={item.quote}/></Title>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => callApi()}>Recharger</Button>
                </Card.Actions>
            </Card>
        </View>
    );

    const renderItemQuoteList = ({ item }) => (
        <View >
            <Card>
                <Card.Title title={item.character} subtitle="" left={LeftContent} />
                <Card.Content>
                    <Quotes quoteList={item.quote}></Quotes>
                </Card.Content>
            </Card>
        </View>
    );


  return (
    <View style={styles.container}>
        <FlatList
            data={quote}
            renderItem={renderItem}
            keyExtractor={item => item.dt}
        />
        {inputAddQuote()}
        <Button
            onPress={onPressQuote}
        >Charger des citations</Button>
        <FlatList
            data={quoteList}
            renderItem={renderItemQuoteList}
            keyExtractor={item => item.dt}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
