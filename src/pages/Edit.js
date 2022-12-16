import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {getDomainById, updateDomain, getLogoImg, uploadLogo} from "../api";
import { SERVER_HOST} from '../config'

const optionList = [
    {value: 1, label: 'True'},
    {value: 0, label: 'False'}
]

const salepageOpList = [
    {value: 'make offer', label: 'make offer'},
    {value: 'increase', label: 'increase'}
]

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
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
    const [isvisible, setIsvisible] = useState(0)
    const [salepage, setSalepage] = useState('make offer')
    const [dailyincrease, setDailyincrease] = useState(0)
    const [initprice, setInitprice] = useState(0)
    const [haslogo, setHaslogo] = useState(0);
    const [logo, setLogo] = useState(null);
    const [newlogo, setNewLogo] = useState(null);
    const [startauction, setStartAuction] = useState('');
    const [cvlist, setCvlist] = useState([])

    useEffect(() => {
        fetchData()
    }, [id])

    useEffect(() => {
        const list = findPermutations('CVCV').concat(findPermutations('CVC')).concat(findPermutations('CVV'))
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

    const fetchData = async () => {
        const result = await getDomainById(id);
        console.log(result);
        if (result.success) {
            const data = result.message
            setDomainname(data.domainname.split('.')[0])
            setMemberid(data.memberid)
            setExtension(data.extension)
            setMinprice(parseFloat(data.minprice.substring(1).replace(/,/g, '')))
            setCountterms(data.countterms)
            setSyllables(data.syllables)
            setIssymetric({label: data.issymetric ? 'True' : 'False', value: data.issymetric})
            setIsword({label: data.isword ? 'True' : 'False', value: data.isword})
            setNamecv({label: data.namecv, value: data.namecv})
            setLink(data.link)
            setIsbrokered({label: data.isbrokered ? 'True' : 'False', value: data.isbrokered})
            setSourcedby(data.sourcedby)
            setBin(data.bin)
            setListingdate(new Date(data.listingdate))
            setMonthlyrental(parseFloat(data.monthlyrental.substring(1).replace(/,/g, '')))
            setIsfeatured({label: data.isfeatured ? 'True' : 'False', value: data.isfeatured})
            setRank(data.rank)
            setReferedby({label: data.referedby ? 'True' : 'False', value: data.referedby})
            setCatchyfeatured({label: data.catchyfeatured ? 'True' : 'False', value: data.catchyfeatured})
            setFeaturedfrom(data.featuredfrom)
            setFeaturedto(data.featuredto)
            setIsvisible({label: data.isvisible ? 'True' : 'False', value: data.isvisible})
            setSalepage({label: data.salepage, value: data.salepage})
            setDailyincrease(data.dailyincrease)
            setInitprice(parseFloat(data.initprice.substring(1).replace(/,/g, '')))
            setHaslogo(data.haslogo)
            setStartAuction(data.startauction )
            if (data.haslogo) {
                setLogo(`${SERVER_HOST}/logos/${data.name}.${data.extension}.png`)
            }
        }
    }

    const swalFunc = (type, title, text) => {
        Swal.fire({
            icon: type,
            title: title,
            text: text,
            showConfirmButton: true,
        });
    }

    const handleLogoUpload = async () => {
        if (newlogo) {
            const formData = new FormData()
            formData.append('logo', newlogo)
            formData.append('filename', `${domainname.toLowerCase()}.${extension}`)
            const result = await uploadLogo(formData)
            console.log('upload result---', result)
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Logo Uploaded!',
                    text: `Uploaded logo successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setHaslogo(1)
            }
        }
    }

    const handleUpdate = async e => {
        e.preventDefault();

        if (!domainname) {return swalFunc('error', 'Missing Insert', 'Domain name is missing');}
        if ((!(listingdate instanceof Date && !isNaN(listingdate))) && typeof listingdate !== 'string') {return swalFunc('error', 'Missing Insert', 'Listing Date is missing');}
        if (salepage.value === 'increase' && (!(startauction instanceof Date && !isNaN(startauction))) && typeof startauction !== 'string') {return swalFunc('error', 'Missing Insert', 'Start Auction Date is missing');}
        if (salepage.value === 'increase' && !dailyincrease) {return swalFunc('error', 'Missing Insert', 'Daily Increase is missing');}
        if (salepage.value === 'increase' && !initprice) {return swalFunc('error', 'Missing Insert', 'Init Price is missing');}

        const updateResult = await updateDomain({
            id,
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
            salepage: salepage.value,
            dailyincrease,
            initprice,
            haslogo
        })
        if (updateResult.success) {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
                willClose(popup) {
                    window.location.reload()
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Domain Update Error',
                text: updateResult.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }

    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Domain</h1>
                <div>
                    <input
                        className="muted-button"
                        type="button"
                        value="Back"
                        onClick={() => navigate('/admin', {replace: true})}
                    />
                </div>
                <label htmlFor="domainname">Domain Name</label>
                <input
                    id="domainname"
                    type="text"
                    name="domainname"
                    value={domainname}
                    onChange={e => setDomainname(e.target.value)}
                    required
                />
                <label>Logo Image</label>
                {(haslogo && logo) ? <img src={logo} style={{width: 130}}/> : <div/>}
                <input type={'file'} onChange={el => setNewLogo(el.target.files[0])}/>
                {newlogo ? <img src={URL.createObjectURL(newlogo)} style={{width: 130}}/> : <div/>}
                <br/>
                <input
                    style={{ marginTop: '12px' }}
                    className="success"
                    type="button"
                    value="Upload Logo"
                    onClick={() => {handleLogoUpload()}}
                />
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
                    required
                />
                <label htmlFor="minprice">Min Price</label>
                <input
                    id="minprice"
                    type="number"
                    name="minprice"
                    value={minprice}
                    onChange={e => setMinprice(e.target.value)}
                    required
                />
                <label htmlFor="countterms">Count Terms</label>
                <input
                    id="countterms"
                    type="text"
                    name="countterms"
                    value={countterms}
                    onChange={e => setCountterms(e.target.value)}
                    required
                />
                <label htmlFor="syllables">Syllables</label>
                <input
                    id="syllables"
                    type="number"
                    name="syllables"
                    value={syllables}
                    onChange={e => setSyllables(e.target.value)}
                    required
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
                    required
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
                <Select
                    value={salepage}
                    options={salepageOpList}
                    onChange={setSalepage}
                />
                {salepage && salepage.value === 'increase' ? <div>
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
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => navigate('/admin', {replace: true})}
                    />
                </div>
            </form>
        </div>
    );
};

export default Edit;
