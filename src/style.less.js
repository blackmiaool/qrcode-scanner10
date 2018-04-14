
const { StyleSheet } = require('react-native');

module.exports = function({vw}){
    const allStyle = StyleSheet.create({
        s0: {
            alignItems: "center",
            backgroundColor: "#000",
            flex: 1,
            justifyContent: "flex-start"
        },
        s1: {
            alignItems: "center",
            backgroundColor: "white",
            flexDirection: "row",
            height: "50%",
            justifyContent: "center",
            width: (vw*100)|0
        },
        s2: {
            backgroundColor: "steelblue",
            borderColor: "#333",
            borderRadius: 5,
            borderWidth: 1,
            color: "#fff",
            fontSize: 20,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10
        },
        s3: {
            backgroundColor: "#f6f6f6",
            borderTopColor: "#777",
            borderTopWidth: 3,
            flex: 1,
            height: (vw*30)|0,
            width: (vw*100)|0
        }
    });

    return {
        default: {},
        App: {
            container: allStyle.s0,
            "reload-container": allStyle.s1,
            "scan-again-btn": allStyle.s2,
            "result-container": allStyle.s3
        }
    };
};
