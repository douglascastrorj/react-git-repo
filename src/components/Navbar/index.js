const createNavBar = (Title) => {
    return {
        title: Title,
        headerStyle: {
          backgroundColor: '#4a148c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
}

export default createNavBar;