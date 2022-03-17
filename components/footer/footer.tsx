import links from '../../data/links';

const etherscanAddress = 'https://etherscan.io/address/';
const codeSection = '#code';
const contractLink = `${etherscanAddress}${links.contract}${codeSection}`;

function Footer() {
    return (
        <footer className="footer">
            <dl>
                <dt>Contract:</dt>
                <dd>
                    <a target="_blank" href={contractLink} rel="noopener noreferrer">
                        <span>
                            {links.contract}
                        </span>
                    </a>
                </dd>
            </dl>
        </footer>
    )
}

export default Footer;