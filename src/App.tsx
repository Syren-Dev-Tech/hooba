import './styles/app.scss';
import { BrandButton } from '@syren-dev-tech/confects/buttons';
import { Heading } from '@syren-dev-tech/confects/decorations';
import { Page, PageBody, PageFooter, PageHeader, PageMain } from '@syren-dev-tech/confects/containers';
import { themes } from '@syren-dev-tech/confetti/themes';
import { uniqueKey } from '@syren-dev-tech/confects/helpers';
import { useEffect, useState } from 'react';

interface ICost {
    days: number | number[]
    price: number | number[]
}

interface IPrice {
    size: [number, number]
    cost: ICost[]
}

function getLocalizedPrice(price: number) {
    const locale = navigator.language; // Detect user's locale
    const formattedPrice = new Intl.NumberFormat(locale, {
        currency: 'USD',
        style: 'currency'
    }).format(price);

    return formattedPrice;
}

export default function App() {

    const [prices, setPrices] = useState<IPrice[]>([]);

    useEffect(() => {
        themes.init();
    }, []);

    useEffect(() => {
        // Get base URL from vite config
        const baseUrl = import.meta.env.BASE_URL || '/hooba/';
        // Fetch prices from the API
        fetch(baseUrl + '/prices.json')
            .then(response => response.json())
            .then(data => setPrices(data))
            .catch(error => console.error('Error fetching prices:', error));
    }, []);

    return <Page
        className={themes.getBasicStyling('body')}
    >
        <PageHeader
            className={themes.getBasicStyling('primary')}
        >
            <Heading>
                {'Hooba\'s Lovely World'}
            </Heading>
        </PageHeader>

        <PageBody
            className={themes.getBasicStyling('body')}
        >
            <PageMain
                className={themes.getBasicStyling('content')}
            >
                <Heading
                    level={2}
                >
                    Hello!
                </Heading>

                <p>
                    I work with WorldPainter only and an incredibly creative mindset!
                </p>

                <p>
                    My map sizes range from 256 all the way up to 20,000.
                </p>

                <p>
                    My prices for custom Minecraft maps:
                </p>

                <table
                    className={themes.getBasicStyling('secondary')}
                >
                    <thead>
                        <tr
                            className={themes.getBasicStyling('primary')}
                        >
                            <th>
                                Size
                            </th>
                            <th>
                                Estimated Time
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prices.map((price) => (
                                <tr key={uniqueKey()}>
                                    <td>
                                        {price.size[0]} - {price.size[1]} blocks
                                    </td>
                                    <td>
                                        {
                                            price.cost.map((cost) => (
                                                <div key={uniqueKey()}>
                                                    {Array.isArray(cost.days) ? cost.days.join(' - ') : cost.days} days
                                                </div>
                                            ))
                                        }
                                    </td>
                                    <td>
                                        <ul>
                                            {
                                                price.cost.map((cost) => {
                                                    return <li key={uniqueKey()}>
                                                        {
                                                            cost.price instanceof Array
                                                                ? cost.price.map((p) => (
                                                                    <div key={uniqueKey()}>
                                                                        {getLocalizedPrice(p)} USD
                                                                    </div>
                                                                ))
                                                                : `${getLocalizedPrice(cost.price)} USD`
                                                        }
                                                    </li>;
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <p>
                    Bigger is always an option, but I will need more time and money for that!
                    <br />
                    For Bedrock maps, you need to first convert it first, since I only work with Java Edition.
                    <br />
                </p>

                <p>
                    Disclaimer: Please communicate and ask questions beforehand.
                    {'I love to make Minecraft maps and I love geography, and I want to make sure you love the maps as much as I do by the time I\'m done.'}
                    Help me help you!
                </p>
                <p>
                    {'Please don\'t ask for updates frequently.'}
                    I assure you I am working on your map!
                    But like all artists, I need space to work.
                    I will let you know when there has been significant progress.
                </p>

                <p>
                    Here is my portfolio:
                </p>

                <div
                    className='imgur-embed-container'
                >
                    <blockquote
                        className='imgur-embed-pub'
                        lang='en'
                        data-id='a/vONBeGk'
                    >
                        <a
                            href='//imgur.com/a/vONBeGk'
                        >
                            My portfolio for World painter
                        </a>
                    </blockquote>
                    <script async src='//s.imgur.com/min/embed.js'></script>
                </div>
            </PageMain>
        </PageBody>

        <PageFooter
            className={themes.getBasicStyling('primary')}
        >
            <Heading
                level={3}
            >
                Ordering:
            </Heading>

            <a
                href='https://discord.gg/TxvgCngzbW'
                target='_blank'
                rel='noopener noreferrer'
            >
                <BrandButton
                    brand='discord'
                />
            </a>
        </PageFooter>
    </Page>;
}