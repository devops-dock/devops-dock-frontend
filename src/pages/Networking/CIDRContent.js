import { React } from "react";
import cidr_img from '../../assets/images/cidr.png';
import subnet_img from '../../assets/images/subnet.png';
import total_subnet_img from '../../assets/images/total-subnet.png';
import iprange_img from '../../assets/images/IP-range.png';
import subnet_prefix_img from '../../assets/images/subnet-prefix.png';
import wildcard_img from '../../assets/images/wildcard.png';


const CIDRContent = () => {
    return (
        <div className="cidr-content text-justify py-3">
            <p>
                CIDR means Classless Inter-Domain Routing, is a method used to allocate and specify IP addresses and
                their associated routing information. It is used to replace traditional classful addressing system and allows 
                users to use VLSM (Variable Length Subnet Masks) for dynamic subnet routing.
            </p>
            <h3 className="cidr-title">CIDR Notation</h3>
            <p>
                In CIDR notation, an IP address is followed by a forward slash <b>"/"</b> and a number, 
                which represents the number of bits in the network prefix. 
            </p>
            <p>
                For example, <span className="bg-secondary-subtle text-danger p-1">196.168.1.0/24</span> represents an IP network where the first 24 bits 
                <span className="bg-secondary-subtle text-danger p-1">( 196.168.1 )</span> are the network address, and the remaining 8 bits are available for host addresses.
                With CIDR, we can create Variable Length Subnet Masks(VLSM), leading to less wastage of IP addresses.
            </p>
            <h3 className="cidr-title">CIDR calculation:</h3>
            <p>
                To calculate CIDR network to IP range:
                <ol>
                    <li>Find the subnet mask for CIDR</li>
                    <li>Apply subnet mask</li>
                    <li>Use wildcard bits to determine the range</li>
                </ol>

                <h5 className="cidr-title text-decoration-underline mb-4">Find the subnet mask for CIDR:</h5>
                <p>
                    Ex: 196.168.1.156/24 <br/>
                    Here ‘/24’ → 24 <span className="bg-secondary-subtle text-danger">1’s</span> and 8 → <span className="bg-secondary-subtle text-danger">0’s</span> [24 + 8 = 32 bits] <br/>
                    Convert the above from decimal to binary as shown below figure:
                    <figure>
                        <img src={cidr_img} alt='cidr-image' width='100%' className="py-2" />
                        <figcaption className="text-center text-secondary">
                            <i>CIDR IP address in binary representation</i>
                        </figcaption>
                    </figure>
                </p>

                <h5 className="cidr-title text-decoration-underline mb-4">Apply subnet mask</h5>
                <p>
                    For subnet mask the number ‘/24’ means 24 <span className="bg-secondary-subtle text-danger">1’s</span> and remaining 8 <span className="bg-secondary-subtle text-danger">0’s</span>
                    <figure>
                        <img src={subnet_img} alt='cidr-image' width='100%' className="py-2" />
                        <figcaption className="text-center text-secondary">
                            <i>Subnet mask in binary representation</i>
                        </figcaption>
                    </figure>
                </p>

                <h5 className="cidr-title text-decoration-underline mb-4">Use wildcard bits to determine range:</h5>
                <p>
                    Using bitwise AND operation to above two to determine the range of IP addresses.
                    <figure>
                        <img src={total_subnet_img} alt='cidr-image' width='100%' className="py-2" />
                        <figcaption className="text-center text-secondary">
                            <i>Bitwise AND operation for CIDR IP address and subnet mask</i>
                        </figcaption>
                    </figure>
                    The result we get is subnet prefix → 196.168.1.0/24
                </p>

                <h5 className="cidr-title text-decoration-underline mb-4">Determine the IP range:</h5>
                <p>
                    The bits that are not covered in subnet mask are the wildcard bits ad they are filled 
                    with range of unique bit combinations to form unique IP addresses that fall under subnet network. 
                    the wildcard bits of subnet mask is shown below figure:
                    <figure>
                        <img src={wildcard_img} alt='cidr-image' width='100%' className="py-2" />
                        <figcaption className="text-center text-secondary">
                            <i>wildcard bits for subnet mask</i>
                        </figcaption>
                    </figure>
                    <p>
                        We can finally determine the IP range! The range starts at the IP address with all 0s in the wildcard bit positions:
                        <figure>
                            <img src={subnet_prefix_img} alt='cidr-image' width='100%' className="py-2" />
                            <figcaption className="text-center text-secondary">
                                <i>The First IP range starts with subnet prefix - 196.168.1.0</i>
                            </figcaption>
                        </figure>
                    </p>
                    <p>
                        Wildcard mask is inverted CIDR mask and it is calculated by performing a bitwise NOT on CIDR mask. 
                        And the range ends with IP address that has all 1s in this position
                        <figure>
                            <img src={iprange_img} alt='cidr-image' width='100%' className="py-2" />
                            <figcaption className="text-center text-secondary">
                                <i> End of IP range with subnet prefix - 196.168.1.255</i>
                            </figcaption>
                        </figure>
                    </p>

                    <p>
                        And there we have it — the IP range of the   block <span className="bg-secondary-subtle text-danger p-1">196.168.1.156/24</span> is 
                        <span className="bg-secondary-subtle text-danger p-1">196.168.1.0</span> to <span className="bg-secondary-subtle text-danger p-1">196.168.1.255</span> ! 
                        We can also see that we have 2^8 = 256 unique IP addresses in our network block.
                    </p>
                </p>
            </p>
        </div>
    )
} 

export default CIDRContent;
