
const { StyleSheet } = require('react-native');

module.exports = function({vw}){
    const allStyle = StyleSheet.create({
        s0: {
            backgroundColor: "steelblue",
            borderColor: "#333",
            borderRadius: 5,
            borderWidth: 1,
            color: "#fff",
            fontSize: 20
        },
        s1: {
            alignItems: "center",
            backgroundColor: "#000",
            flex: 1,
            justifyContent: "flex-start"
        },
        s2: {
            position: "relative"
        },
        s3: {
            height: 300,
            width: (vw*100)|0
        },
        s4: {
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10
        },
        s5: {
            alignItems: "center",
            backgroundColor: "white",
            flexDirection: "row",
            height: "50%",
            justifyContent: "center",
            width: (vw*100)|0
        },
        s6: {
            backgroundColor: "#f6f6f6",
            borderTopColor: "#777",
            borderTopWidth: 3,
            flex: 1,
            padding: (vw*5)|0,
            width: (vw*100)|0
        },
        s7: {
            marginBottom: 20
        },
        s8: {
            fontSize: 18
        },
        s9: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontSize: 16,
            paddingBottom: 10,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 10
        },
        s10: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: (vw*4)|0
        },
        s11: {
            fontSize: 20,
            paddingBottom: 12,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 12,
            textAlign: "center",
            width: (vw*40)|0
        }
    });

    return {
        default: {},
        App: {
            "btn-primary": allStyle.s0,
            container: allStyle.s1,
            "scanner-container": allStyle.s2,
            scanner: allStyle.s3,
            "scan-again-btn": allStyle.s4,
            "reload-container": allStyle.s5,
            "result-container": allStyle.s6,
            "result-area": allStyle.s7,
            label: allStyle.s8,
            "result-input": allStyle.s9,
            "tools-wrap": allStyle.s10,
            "tool-btn": allStyle.s11
        }
    };
};
