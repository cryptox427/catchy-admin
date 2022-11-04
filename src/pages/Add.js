import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { addDomain, uploadLogo } from "../api";
import Select from "react-select";
import Datetime from "react-datetime";

const optionList = [
    {value: 1, label: 'True'},
    {value: 0, label: 'False'}
]

const Add = () => {
    const navigate = useNavigate();
    const [domainname, setDomainname] = useState('');
    const [memberid, setMemberid] = useState('');
    const [minprice, setMinprice] = useState(0);
    const [countterms, setCountterms] = useState(0)
    const [syllables, setSyllables] = useState(0)
    const [issymetric, setIssymetric] = useState(0)
    const [isword, setIsword] = useState(0)
    const [namecv, setNamecv] = useState('')
    const [extension, setExtension] = useState('com')
    const [link, setLink] = useState('')
    const [isbrokered, setIsbrokered] = useState(0)
    const [sourcedby, setSourcedby] = useState('')
    const [bin, setBin] = useState(0)
    const [listingdate, setListingdate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    const [monthlyrental, setMonthlyrental] = useState(0)
    const [isfeatured, setIsfeatured] = useState(0)
    const [featuredfrom, setFeaturedfrom] = useState('')
    const [featuredto, setFeaturedto] = useState('')
    const [referedby, setReferedby] = useState(0)
    const [rank, setRank] = useState(0)
    const [catchyfeatured, setCatchyfeatured] = useState(0)
    const [isvisible, setIsvisible] = useState(1)
    const [salepage, setSalepage] = useState('make offer')
    const [dailyincrease, setDailyincrease] = useState(0)
    const [initprice, setInitprice] = useState(0)
    const [logo, setLogo] = useState(null)
    const [startauction, setStartAuction] = useState('');
    const [cvlist, setCvlist] = useState([])

    useEffect(() => {
        const list = [''].concat(findPermutations('CVCV').concat(findPermutations('CVC')).concat(findPermutations('CVV')))
        setCvlist(list.map(el => {return {value: el, label: el}}))
    }, []);

    const findPermutations = (string) => {
        if (!string || typeof string !== "string"){
            return "Please enter a string"
        } else if (string.length < 2 ){
            return string
        }

        let permutationsArray = []

        for (let i = 0; i < string.length; i++){
            let char = string[i]

            let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

            for (let permutation of findPermutations(remainingChars)){
                permutationsArray.push(char + permutation) }
        }
        return permutationsArray
    }

    const handleAdd = async e => {
        e.preventDefault();

        if (!domainname) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Domain Name is required.',
                showConfirmButton: true,
            });
        }
        let haslogo = 0;
        if (logo) {
            const formData = new FormData()
            formData.append('logo', logo)
            formData.append('filename', `${domainname.toLowerCase()}.${extension}`)
            const result = await uploadLogo(formData)
            console.log('upload result---', result)
            if (result.success) {
                haslogo = 1
            }
        }

        const addResult = await addDomain({
            memberid,
            domainname,
            minprice,
            countterms,
            syllables,
            issymetric: issymetric.value,
            isword: isword.value,
            namecv: namecv.value,
            extension,
            link,
            isbrokered: isbrokered.value,
            sourcedby: sourcedby,
            bin,
            listingdate: listingdate !== '' ? new Date(listingdate).toISOString() : '',
            monthlyrental,
            isfeatured: isfeatured.value,
            featuredfrom: featuredfrom ? new Date(featuredfrom).toISOString() : '',
            featuredto: featuredto ? new Date(featuredto).toISOString() : '',
            startauction: startauction ? new Date(startauction).toISOString() : '',
            referedby: referedby.value,
            rank,
            catchyfeatured: catchyfeatured.value,
            isvisible:  isvisible.value,
            salepage,
            dailyincrease,
            initprice,
            haslogo
        })
        if (addResult.success) {
            Swal.fire({
                icon: 'success',
                title: 'Domain Add Success!',
                text: `Domain has been Added.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Domain Add Error',
                text: addResult.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }

    };

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('logo', logo)
        formData.append('filename', `${domainname.toLowerCase()}.${extension}`)
        const result = await uploadLogo(formData)
        console.log('upload result---', result)
    }

    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Domain</h1>
                <label htmlFor="domainname">Domain Name</label>
                <input
                    id="domainname"
                    type="text"
                    name="domainname"
                    value={domainname}
                    onChange={e => setDomainname(e.target.value)}
                />
                <label>Logo Image</label>
                <input type={'file'} onChange={el => setLogo(el.target.files[0])}/>
                <label htmlFor="memberid">Member Id</label>
                <input
                    id="memberid"
                    type="text"
                    name="memberid"
                    value={memberid}
                    onChange={e => setMemberid(e.target.value)}
                />
                <label htmlFor="extension">Extension</label>
                <input
                    id="extension"
                    type="text"
                    name="extension"
                    value={extension}
                    onChange={e => setExtension(e.target.value)}
                />
                <label htmlFor="minprice">Min Price</label>
                <input
                    id="minprice"
                    type="number"
                    name="minprice"
                    value={minprice}
                    onChange={e => setMinprice(e.target.value)}
                />
                <label htmlFor="countterms">Count Terms</label>
                <input
                    id="countterms"
                    type="text"
                    name="countterms"
                    value={countterms}
                    onChange={e => setCountterms(e.target.value)}
                />
                <label htmlFor="syllables">Syllables</label>
                <input
                    id="syllables"
                    type="number"
                    name="syllables"
                    value={syllables}
                    onChange={e => setSyllables(e.target.value)}
                />
                <label htmlFor="issymetric">Is Symetric</label>
                <Select
                    value={issymetric}
                    options={optionList}
                    onChange={setIssymetric}
                />
                <label htmlFor="isword">Is Word</label>
                <Select
                    value={isword}
                    options={optionList}
                    onChange={setIsword}
                />
                <label htmlFor="namecv">NameCV</label>
                <Select
                    value={namecv}
                    options={cvlist}
                    onChange={setNamecv}
                />
                <label htmlFor="link">Link</label>
                <input
                    id="link"
                    type="text"
                    name="link"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <label htmlFor="isbrokered">Is Brokered</label>
                <Select
                    value={isbrokered}
                    options={optionList}
                    onChange={setIsbrokered}
                />
                <label htmlFor="sourcedby">Sourced By</label>
                <input
                    id="sourcedby"
                    type="text"
                    name="sourcedby"
                    value={sourcedby}
                    onChange={e => setSourcedby(e.target.value)}
                />
                <label htmlFor="bin">Bin</label>
                <input
                    id="bin"
                    type="number"
                    name="bin"
                    value={bin}
                    onChange={e => setBin(e.target.value)}
                />
                <label htmlFor="listingdate">Listing Date</label>
                <Datetime
                    value={listingdate}
                    onChange={el => setListingdate(new Date(el))}
                />
                <label htmlFor="monthlyrental">Monthly Rental</label>
                <input
                    id="monthlyrental"
                    type="number"
                    name="monthlyrental"
                    value={monthlyrental}
                    onChange={e => setMonthlyrental(e.target.value)}
                />
                <label htmlFor="isfeatured">Is Featured</label>
                <Select
                    value={isfeatured}
                    options={optionList}
                    onChange={setIsfeatured}
                />
                {isfeatured?.value ? <div>
                    <label htmlFor="featuredfrom">Featured From Date</label>
                    <Datetime
                        value={featuredfrom}
                        onChange={el => setFeaturedfrom(new Date(el))}
                    />
                    <label htmlFor="featuredto">Featured To Date</label>
                    <Datetime
                        value={featuredto}
                        onChange={el => setFeaturedto(new Date(el))}
                    />
                </div> : <div/>}
                <label htmlFor="rank">Rank</label>
                <input
                    id="rank"
                    type="number"
                    name="rank"
                    value={rank}
                    onChange={e => setRank(e.target.value)}
                />
                <label htmlFor="referedby">Referred By</label>
                <Select
                    value={referedby}
                    options={optionList}
                    onChange={setReferedby}
                />
                <label htmlFor="catchyfeatured">Catchy Featured</label>
                <Select
                    value={catchyfeatured}
                    options={optionList}
                    onChange={setCatchyfeatured}
                />
                <label htmlFor="isvisible">Is Visible</label>
                <Select
                    value={isvisible}
                    options={optionList}
                    onChange={setIsvisible}
                />
                <label htmlFor="salepage">Sale Page</label>
                <select name="salepage" defaultValue={salepage} onChange={el => setSalepage(el.target.value)}>
                    <option value = ''>Select an option</option>
                    <option value = 'make offer'>make offer</option>
                    <option value = 'increase'>increase</option>
                </select>
                {salepage === 'increase' ? <div>
                    <label htmlFor="dailyincrease">Daily Increase</label>
                    <input
                        id="dailyincrease"
                        type="number"
                        name="dailyincrease"
                        value={dailyincrease}
                        onChange={e => setDailyincrease(e.target.value)}
                    />
                    <label htmlFor="dailyincrease">Init Price</label>
                    <input
                        id="initprice"
                        type="number"
                        name="initprice"
                        value={initprice}
                        onChange={e => setInitprice(e.target.value)}
                    />
                    <label htmlFor="startauction">Start Auction</label>
                    <Datetime
                        value={startauction}
                        onChange={el => setStartAuction(new Date(el))}
                    />
                </div> : <div/>}
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => navigate('/dashboard', {replace: true})}
                    />
                </div>
            </form>
        </div>
    );
};

export default Add;
