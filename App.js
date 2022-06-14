import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
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
    const Tab = createBottomTabNavigator();
    const [quote, setQuote] = useState([]);
    const [quoteList, setQuoteList] = useState([]);
    const [number, setNumber] = useState([]);
    const [name, setName] = useState([]);
    const [quotesByName, setQuotesByName] = useState([]);
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

    const getQuotesByName = () => {
        fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=${name}`)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    setQuotesByName(data);
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

    const onPressQuoteByName= () => {
        //console.log("test")
        getQuotesByName()

        //console.log(goalList)
    };

    const inputAddQuoteByName = () => {
        return (
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
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

    const QuotesByName = ({ quotesByName }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{quotesByName}</Text>
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

    const renderQuotesByName = ({ item }) => (
        <View >
            <Card>
                <Card.Title title={item.character} subtitle="" left={LeftContent} />
                <Card.Content>
                    <QuotesByName quotesByName={item.quote}></QuotesByName>
                </Card.Content>
            </Card>
        </View>
    );

    const SimpsonByName = () => {

        return (
        <View>
            {inputAddQuoteByName()}
            <Button
                onPress={onPressQuoteByName}
            >Charger des citations avec le nom d'un personnage</Button>
            <FlatList
                data={quotesByName}
                renderItem={renderQuotesByName}
                keyExtractor={item => item.dt}

            />
        </View>
        )
    }

    const SimpsonByNumber = () => {
        return (
            <View>
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
        )
    }

    const SimpsonQuotes = () => {
        return (
            <View>
                <FlatList
                    data={quote}
                    renderItem={renderItem}
                    keyExtractor={item => item.dt}
                />
            </View>
        )
    }

  return (
    <View style={styles.container}>
        {SimpsonQuotes()}
        {SimpsonByNumber()}
        {SimpsonByName()}


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
