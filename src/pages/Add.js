import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { addDomain, uploadLogo } from "../api";
const cvlist = ['CVVC','CCVC','CVCV','CVC','CCVV','CVCC']

const Add = () => {
    const navigate = useNavigate();
    const [domainname, setDomainname] = useState('');
    const [memberid, setMemberid] = useState(1);
    const [minprice, setMinprice] = useState(0);
    const [countterms, setCountterms] = useState(0)
    const [syllables, setSyllables] = useState(0)
    const [issymetric, setIssymetric] = useState(0)
    const [isword, setIsword] = useState(0)
    const [namecv, setNamecv] = useState('')
    const [extension, setExtension] = useState('com')
    const [link, setLink] = useState('')
    const [isbrokered, setIsbrokered] = useState(0)
    const [sourcedby, setSourcedby] = useState(0)
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

        const addResult = await addDomain({memberid, domainname, minprice, countterms, syllables, issymetric, isword, namecv, extension, link, isbrokered, sourcedby, bin, listingdate, monthlyrental, isfeatured,
            featuredfrom, featuredto, referedby, rank, catchyfeatured, isvisible, salepage, dailyincrease,initprice, haslogo})
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
                    type="number"
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
                <select name="issymetric" defaultValue={issymetric} onChange={(el) => setIssymetric(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="isword">Is Word</label>
                <select name="isword" defaultValue={isword} onChange={el => setIsword(el.target.value)}>
                    <option value={1}>True</option>
                    <option value={0}>False</option>
                </select>
                <label htmlFor="namecv">NameCV</label>
                <select name="namecv" defaultValue={namecv} onChange={(el) => setNamecv(el.target.value)}>
                    <option value = ''>Select an option</option>
                    {cvlist.map(cv => {
                        return <option key={cv} value={cv}>{cv}</option>
                    })}
                </select>
                <label htmlFor="link">Link</label>
                <input
                    id="link"
                    type="text"
                    name="link"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <label htmlFor="isbrokered">Is Brokered</label>
                <select name="isbrokered" defaultValue={isbrokered} onChange={el => setIsbrokered(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="sourcedby">Sourced By</label>
                <select name="sourcedby" defaultValue={sourcedby} onChange={el => setSourcedby(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="bin">Bin</label>
                <input
                    id="bin"
                    type="number"
                    name="bin"
                    value={bin}
                    onChange={e => setBin(e.target.value)}
                />
                <label htmlFor="listingdate">Listing Date</label>
                <input
                    id="listingdate"
                    type="date"
                    name="listingdate"
                    value={listingdate}
                    onChange={e => setListingdate(e.target.value)}
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
                <select name="isfeatured" defaultValue={isfeatured} onChange={el => setIsfeatured(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                {isfeatured && <div>
                    <label htmlFor="featuredfrom">Featured From Date</label>
                    <input
                        id="featuredfrom"
                        type="date"
                        name="featuredfrom"
                        value={featuredfrom}
                        onChange={e => setFeaturedfrom(e.target.value)}
                    />
                    <label htmlFor="featuredto">Featured To Date</label>
                    <input
                        id="featuredto"
                        type="date"
                        name="featuredto"
                        value={featuredto}
                        onChange={e => setFeaturedto(e.target.value)}
                    />
                </div>}
                <label htmlFor="rank">Rank</label>
                <input
                    id="rank"
                    type="number"
                    name="rank"
                    value={rank}
                    onChange={e => setRank(e.target.value)}
                />
                <label htmlFor="referedby">Referred By</label>
                <select name="referedby" defaultValue={referedby} onChange={el => setReferedby(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="catchyfeatured">Catchy Featured</label>
                <select name="catchyfeatured" defaultValue={catchyfeatured} onChange={el => setCatchyfeatured(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="isvisible">Is Visible</label>
                <select name="isvisible" defaultValue={isvisible} onChange={el => setIsvisible(el.target.value)}>
                    <option value = {1}>True</option>
                    <option value = {0}>False</option>
                </select>
                <label htmlFor="salepage">Sale Page</label>
                <select name="salepage" defaultValue={salepage} onChange={el => setSalepage(el.target.value)}>
                    <option value = ''>Select an option</option>
                    <option value = 'make offer'>make offer</option>
                </select>
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
