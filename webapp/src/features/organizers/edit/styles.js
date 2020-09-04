const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    moreButton: {
        zIndex: 1,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    floatingRight: {
        position: "fixed",
        bottom: "1rem",
        right: "3.5rem"
    },
    iconCard: {
        height: "100%"
    },
    paragraph: {
        ...theme.header.title,
        paddingLeft: '50px'
    }
})

export default styles;