import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { SimpleLineIcons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export default function Header() {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <SimpleLineIcons name="magnifier" size={20} color="white" />
            </TouchableOpacity>

            <TextInput
                style={{ height: 40, borderColor: 'blue', borderWidth: '0', paddingHorizontal: 10, width: '65%', color: 'white', marginLeft: 20, fontSize: 18 }}
                placeholder="Tìm kiếm"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    header: {
        backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: '100%',
        width: '100%'
    },
});
