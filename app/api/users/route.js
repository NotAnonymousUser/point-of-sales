const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');  

    let data = [];
    switch (type) {
        case 'customers':
            data = [
                { label: 'Customer 1' },
                { label: 'Customer 2' },
                { label: 'Customer 3' },
            ];
            break;
        case 'name':
            data = [
                { label: 'Name 1' },
                { label: 'Name 2' },
                { label: 'Name 3' },
            ];
            break;
        case 'contactperson':
            data = [
                { label: 'Contact 1' },
                { label: 'Contact 2' },
                { label: 'Contact 3' },
            ];
            break;
        default:
            data = [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' },
            ];
            break;
    }

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
};

const POST = async () => {
    return new Response(JSON.stringify({ message: "this is the POST METHOD" }), {
        headers: { 'Content-Type': 'application/json' }
    });
};

export { GET, POST };
